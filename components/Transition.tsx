'use client';

import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, easeInOut }}
        className="py-0 flex flex-col justify-center items-center flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
