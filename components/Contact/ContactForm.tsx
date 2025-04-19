'use client';

import classNames from 'classnames';
import { Loader } from 'components/Loader';
import { useEmail } from 'hooks';
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
    <div className="fixed inset-0 z-50 bg-darkSecondary/30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-darkSecondary border-white border shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border border-gray-300 p-2 text-darkSecondary"
            required
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            value={formValues.name}
            name="name"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 text-darkSecondary"
            required
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            value={formValues.email}
            name="email"
          />
          <input
            type="text"
            placeholder="Asunto (opcional)"
            className="w-full border border-gray-300 p-2 text-darkSecondary"
            onChange={(e) =>
              setFormValues({ ...formValues, subject: e.target.value })
            }
            value={formValues.subject}
            name="subject"
          />
          <textarea
            placeholder="Mensaje"
            rows={4}
            className="w-full border border-gray-300 p-2 text-darkSecondary"
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
    </div>
  );
};
