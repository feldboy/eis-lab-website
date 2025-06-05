'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Use usePathname for App Router

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
  const pathname = usePathname(); // Initialize usePathname

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}> {/* Use pathname for key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
