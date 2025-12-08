import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SendingState } from 'app/types';

export const useEmail = () => {
  const [sendingState, setSendingState] = useState<SendingState>('IDLE');

  const sendEmail = async (formValues: {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }) => {
    try {
      setSendingState('SENDING');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formValues,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setSendingState('SENT');
    } catch (error) {
      setSendingState('ERROR');
      console.error('Error sending email:', error);
    }
  };

  return {
    sendingState,
    sendEmail,
  };
};
