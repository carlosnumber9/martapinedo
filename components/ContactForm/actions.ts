'use server';

import type { ContactFormValues, SendingState } from 'app/types';
import { headers } from 'next/headers';
import { verifyTurnstileToken } from 'utils/captcha';
import { getFormValue } from 'utils/formData';
import { assertRateLimit } from 'utils/rateLimit';

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const CONTACT_FORM_RATE_LIMIT = {
  limit: 5,
  windowMs: 10 * 60 * 1000,
};

const getContactFormValues = (formData: FormData): ContactFormValues => ({
  name: getFormValue(formData, 'name'),
  email: getFormValue(formData, 'email'),
  message: getFormValue(formData, 'message'),
  subject: getFormValue(formData, 'subject'),
});

const getCaptchaToken = (formData: FormData) =>
  getFormValue(formData, 'captchaToken') || getFormValue(formData, 'cf-turnstile-response');

const assertLegalsAccepted = (formData: FormData) => {
  if (getFormValue(formData, 'legalsAccepted') !== 'true') {
    throw new Error('Legal terms must be accepted');
  }
};

const getRateLimitKey = async () => {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = requestHeaders.get('x-real-ip');
  const cloudflareIp = requestHeaders.get('cf-connecting-ip');

  return cloudflareIp || forwardedFor || realIp || 'unknown';
};

const getEmailJsConfig = () => ({
  serviceId: process.env.EMAILJS_SERVICE_ID || '',
  templateId: process.env.EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

const sendContactEmail = async (formValues: ContactFormValues) => {
  const { serviceId, templateId, publicKey, privateKey } = getEmailJsConfig();

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing');
  }

  const response = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: formValues,
      ...(privateKey ? { accessToken: privateKey } : {}),
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      `EmailJS request failed with status ${response.status}: ${errorMessage || response.statusText}`
    );
  }
};

export const submitContactFormAction = async (
  _previousState: SendingState,
  formData: FormData
): Promise<SendingState> => {
  try {
    const captchaToken = getCaptchaToken(formData);

    if (!captchaToken) {
      throw new Error('Captcha token is missing');
    }

    assertLegalsAccepted(formData);
    assertRateLimit({
      key: await getRateLimitKey(),
      limit: CONTACT_FORM_RATE_LIMIT.limit,
      windowMs: CONTACT_FORM_RATE_LIMIT.windowMs,
    });
    await verifyTurnstileToken(captchaToken);
    await sendContactEmail(getContactFormValues(formData));

    return 'SENT';
  } catch (error) {
    console.error('Error sending contact email:', error);

    return 'ERROR';
  }
};
