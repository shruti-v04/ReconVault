import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, History, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/history', label: 'History', icon: History },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Shield className="w-8 h-8 text-cyber-accent" />
              <div className="absolute inset-0 bg-cyber-accent/20 blur-xl rounded-full" />
            </motion.div>
            <span className="text-xl font-bold">
              <span className="text-white">Recon</span>
              <span className="gradient-text">Vault</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${isActive ? 'text-cyber-accent' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-cyber-accent/10 rounded-lg border border-cyber-accent/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
