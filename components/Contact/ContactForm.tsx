'use client';

import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export const ContactModal = ({ onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
            className="w-full border border-gray-300 p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2"
            required
          />
          <input
            type="text"
            placeholder="Asunto (opcional)"
            className="w-full border border-gray-300 p-2"
          />
          <textarea
            placeholder="Mensaje"
            rows={4}
            className="w-full border border-gray-300 p-2"
            required
          />
          <button
            type="submit"
            className="bg-darkPrimary hover:bg-darkSecondary text-white font-semibold py-2 px-4 w-full transition"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};
