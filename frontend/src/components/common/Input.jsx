import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <motion.div
          className={`
            relative flex items-center glass rounded-xl overflow-hidden
            ${isFocused ? 'ring-2 ring-cyber-accent/50' : ''}
            ${error ? 'ring-2 ring-cyber-danger/50' : ''}
          `}
          animate={{
            boxShadow: isFocused
              ? '0 0 20px rgba(6, 182, 212, 0.2)'
              : '0 0 0px rgba(6, 182, 212, 0)',
          }}
        >
          {Icon && (
            <div className="pl-4 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-transparent px-4 py-3 text-white placeholder-gray-500
              focus:outline-none font-mono text-lg
              ${Icon ? 'pl-2' : ''}
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-cyber-danger"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
