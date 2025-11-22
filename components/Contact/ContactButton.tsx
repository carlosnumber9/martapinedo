'use client';

import { useRef, useState } from 'react';
import { useLottie } from 'lottie-react';
import { useScrollOpacity } from 'hooks';
import { LOTTIE_OPTIONS } from 'utils/animations';
import { ContactModal } from './ContactForm';

export const ContactButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useScrollOpacity(buttonRef);

  const { View: ContactIcon } = useLottie(LOTTIE_OPTIONS.CONTACT);

  return (
    <div>
      {isOpen && <ContactModal onClose={() => setIsOpen(false)} />}
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bottom-5 right-5 w-36 h-36 flex justify-center items-center rounded-full transition-colors duration-500 ease-in-out cursor-pointer"
        style={{ opacity: isOpen ? 'none' : 'flex' }}
      >
        {ContactIcon}
      </div>
    </div>
  );
};