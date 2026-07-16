import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-cyber-accent to-cyber-success text-cyber-dark font-semibold hover:shadow-lg hover:shadow-cyber-accent/25',
  secondary: 'glass border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10',
  danger: 'bg-cyber-danger/20 border border-cyber-danger/30 text-cyber-danger hover:bg-cyber-danger/30',
  ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      loading = false,
      icon: Icon,
      iconPosition = 'left',
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center gap-2 
      rounded-xl font-medium transition-all duration-300 
      focus:outline-none focus:ring-2 focus:ring-cyber-accent/50 focus:ring-offset-2 focus:ring-offset-cyber-dark
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    return (
      <motion.button
        ref={ref}
        type={type}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="[w3.org](http://www.w3.org/2000/svg)"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
