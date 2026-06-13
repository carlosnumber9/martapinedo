'use server';

import type { ContactFormValues, SendingState } from 'app/types';
import { getFormValue } from 'utils/formData';

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const getContactFormValues = (formData: FormData): ContactFormValues => ({
  name: getFormValue(formData, 'name'),
  email: getFormValue(formData, 'email'),
  message: getFormValue(formData, 'message'),
  subject: getFormValue(formData, 'subject'),
});

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
    const captchaToken = getFormValue(formData, 'captchaToken');

    if (!captchaToken) {
      throw new Error('Captcha token is missing');
    }

    await sendContactEmail(getContactFormValues(formData));

    return 'SENT';
  } catch (error) {
    console.error('Error sending contact email:', error);

    return 'ERROR';
  }
};
