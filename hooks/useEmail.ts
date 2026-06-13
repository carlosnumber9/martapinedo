import emailjs from '@emailjs/browser';
import type { ContactFormValues, SendingState } from 'app/types';

export const useEmail = () => {
  const sendEmail = async (
    formValues: ContactFormValues,
    captchaToken: string | null
  ): Promise<SendingState> => {
    try {
      if (!captchaToken) {
        throw new Error('Captcha token is missing');
      }
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formValues,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      return 'SENT';
    } catch (error) {
      console.error('Error sending email:', error);

      return 'ERROR';
    }
  };

  return {
    sendEmail,
  };
};
