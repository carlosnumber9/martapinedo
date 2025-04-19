'use client';

import { useScrollOpacity } from 'hooks';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { ContactModal } from './ContactForm';
import { PageTransition } from 'components/Transition';

export const ContactButton = () => {
  const opacity = useScrollOpacity();
  const [isOpen, setIsOpen] = useState(false);
  return !isOpen ? (
    <motion.div
      className={
        'fixed z-50 bottom-5 right-5 w-20 h-20 flex justify-center items-center rounded-full shadow-contact bg-darkPrimary hover:bg-darkSecondary transition-colors duration-500 ease-in-out cursor-pointer'
      }
      style={{ opacity }}
      onClick={() => setIsOpen(true)}
    >
      <Image src={'/contact.png'} alt={'Contact'} width={50} height={50} />
    </motion.div>
  ) : (
    <PageTransition>
      <ContactModal onClose={() => setIsOpen(false)} />
    </PageTransition>
  );
};
