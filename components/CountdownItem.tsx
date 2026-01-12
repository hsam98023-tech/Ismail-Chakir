import React from 'react';
import { motion } from 'framer-motion';

interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl mb-2 text-2xl sm:text-3xl font-bold text-gray-800 bg-white/40 shadow-inner"
      >
        {value < 10 ? `0${value}` : value}
      </motion.div>
      <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wide">{label}</span>
    </div>
  );
};

export default CountdownItem;