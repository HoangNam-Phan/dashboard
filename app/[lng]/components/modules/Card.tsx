import React, { ReactNode } from 'react';
import { Variants, motion } from 'framer-motion';

type CardProps = {
  children: ReactNode;
  customClasses: string | undefined;
  customVariants: Variants | undefined;
};

export default function Card({
  children,
  customClasses,
  customVariants,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial="hidden"
      animate="visible"
      variants={customVariants}
      className={`bg-white dark:bg-gray-600 shadow-2xl shadow-inner rounded-lg p-5 ${customClasses}`}
    >
      {children}
    </motion.div>
  );
}
