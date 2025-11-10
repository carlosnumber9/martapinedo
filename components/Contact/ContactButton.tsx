'use client';

import { useScrollOpacity } from 'hooks';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { ContactModal } from './ContactForm';
import { useLottie } from 'lottie-react';
import animationData from '../../public/lotties/contact.json';

const defaultOptions = {
  animationData: animationData,
  loop: true,
};

export const ContactButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacity(buttonRef);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const { View: ContactIcon } = useLottie(defaultOptions);

  return (
    <div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 flex items-center justify-center z-50 w-full h-full bg-darkPrimary/80 cursor-pointer"
            onClick={closeModal}
            transition={{ duration: 0.3, type: 'tween', ease: 'easeOut' }}
          >
            <ContactModal onClose={closeModal} />{' '}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        ref={buttonRef}
        style={{ opacity, display: isOpen ? 'none' : 'flex' }}
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bottom-5 right-5 w-36 h-36 flex justify-center items-center rounded-full transition-colors duration-500 ease-in-out cursor-pointer"
      >
        {ContactIcon}
      </motion.div>
    </div>
  );
};
