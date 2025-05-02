'use client';

import classNames from 'classnames';
import { Loader } from 'components/Loader';
import { useEmail } from 'hooks';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

const SUBMIT_BUTTON_CONTENT: Record<string, string | ReactNode> = {
  IDLE: 'Enviar',
  SENDING: <Loader />,
  SENT: 'Mensaje enviado',
  ERROR: 'Error al enviar',
};

export const ContactModal = ({ onClose }: Props) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const { sendingState, sendEmail } = useEmail();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail(formValues);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="fixed top-0 left-0 flex items-center justify-center z-50 w-full h-full bg-darkPrimary/80 cursor-pointer"
        transition={{ duration: 0.3, type: 'tween', ease: 'easeOut' }}
      >
        <div
          className="w-80 h-90 flex flex-col items-center justify-center bg-darkSecondary px-10 py-5 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre*"
              className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300 autofill:!bg-transparent"
              required
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              value={formValues.name}
              name="name"
            />
            <input
              type="email"
              placeholder="Email*"
              className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
              required
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              value={formValues.email}
              name="email"
            />
            <input
              type="text"
              placeholder="Asunto"
              className="w-full p-2 text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white/80 transition-colors ease-in-out duration-300"
              onChange={(e) =>
                setFormValues({ ...formValues, subject: e.target.value })
              }
              value={formValues.subject}
              name="subject"
            />
            <textarea
              placeholder="Mensaje*"
              rows={4}
              className="w-full border border-none focus:outline-none p-2 text-white bg-gray-800/50 focus:bg-white/20 transition-colors ease-in-out duration-300"
              required
              onChange={(e) =>
                setFormValues({ ...formValues, message: e.target.value })
              }
              value={formValues.message}
              name="message"
            />
            <button
              type="submit"
              disabled={sendingState === 'SENDING' || sendingState === 'SENT'}
              onClick={handleSubmit}
              className={classNames(
                'bg-darkPrimary hover:bg-darkSecondary text-white font-semibold py-2 px-4 w-full transition',
                sendingState === 'SENT' && 'bg-green-500 hover:bg-green-600',
                sendingState === 'ERROR' && 'bg-red-500 hover:bg-red-600',
                sendingState === 'SENDING' &&
                  'bg-bluePrimary/50 cursor-not-allowed'
              )}
            >
              {SUBMIT_BUTTON_CONTENT[sendingState]}
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
