import { motion } from 'framer-motion';
import { Shield, Scan, Database, Lock } from 'lucide-react';

const loadingSteps = [
  { icon: Scan, text: 'Initializing scan...' },
  { icon: Database, text: 'Querying DNS records...' },
  { icon: Shield, text: 'Analyzing security headers...' },
  { icon: Lock, text: 'Checking SSL certificates...' },
];

export default function Loader({ message = 'Scanning domain...' }) {
  return (
    <div className="fixed inset-0 bg-cyber-darker/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated shield */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer ring */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner animated circle */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-cyber-accent/50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Shield className="w-12 h-12 text-cyber-accent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.h3
          className="text-xl font-semibold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.h3>

        {/* Progress steps */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  color: ['#6b7280', '#06b6d4', '#10b981', '#6b7280'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                <step.icon className="w-5 h-5" />
              </motion.div>
              <span className="text-sm">{step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full h-1 bg-cyber-slate rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-accent to-cyber-success"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 30, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}
