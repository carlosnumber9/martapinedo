import emailjs from '@emailjs/browser';
import { useState } from 'react';

const SENDING_STATE = {
  IDLE: 'IDLE',
  SENDING: 'SENDING',
  SENT: 'SENT',
  ERROR: 'ERROR',
};

type SendingState = keyof typeof SENDING_STATE;

export const useEmail = () => {
  const [sendingState, setSendingState] = useState<SendingState>(
    SENDING_STATE.IDLE as SendingState
  );

  const sendEmail = async (formValues: {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }) => {
    try {
      setSendingState(SENDING_STATE.SENDING as SendingState);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formValues,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setSendingState(SENDING_STATE.SENT as SendingState);
    } catch (error) {
      setSendingState(SENDING_STATE.ERROR as SendingState);
      console.error('Error sending email:', error);
    }
  };

  return {
    sendingState,
    sendEmail,
  };
};
