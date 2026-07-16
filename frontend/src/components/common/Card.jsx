import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Card({
  title,
  icon: Icon,
  children,
  collapsible = true,
  defaultOpen = true,
  className = '',
  headerClassName = '',
  accentColor = 'cyber-accent',
  badge,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accentClasses = {
    'cyber-accent': 'text-cyber-accent border-cyber-accent/30',
    'cyber-success': 'text-cyber-success border-cyber-success/30',
    'cyber-warning': 'text-cyber-warning border-cyber-warning/30',
    'cyber-danger': 'text-cyber-danger border-cyber-danger/30',
  };

  return (
    <motion.div
      layout
      className={`glass rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-5
          ${collapsible ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'}
          transition-colors duration-200 ${headerClassName}
        `}
        disabled={!collapsible}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2 rounded-lg bg-${accentColor}/10`}>
              <Icon className={`w-5 h-5 ${accentClasses[accentColor]?.split(' ')[0]}`} />
            </div>
          )}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {badge && (
            <span className={`px-2 py-0.5 text-xs rounded-full bg-${accentColor}/20 ${accentClasses[accentColor]?.split(' ')[0]}`}>
              {badge}
            </span>
          )}
        </div>
        {collapsible && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
