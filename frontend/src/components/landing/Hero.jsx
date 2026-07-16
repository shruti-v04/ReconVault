import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Lock, Globe } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useScanContext } from '../../context/ScanContext';
import Loader from '../common/Loader';

const features = [
  { icon: Shield, text: 'Security Headers Analysis' },
  { icon: Zap, text: 'Fast DNS Enumeration' },
  { icon: Lock, text: 'SSL/TLS Inspection' },
  { icon: Globe, text: 'Subdomain Discovery' },
];

export default function Hero() {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { executeScan, isLoading } = useScanContext();

  const validateDomain = (value) => {
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(value.trim());
  };

  const handleScan = async () => {
    const trimmedDomain = domain.trim().toLowerCase();
    
    if (!trimmedDomain) {
      setError('Please enter a domain');
      return;
    }

    if (!validateDomain(trimmedDomain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    setError('');

    try {
      await executeScan(trimmedDomain);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to scan domain');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <>
      {isLoading && <Loader message={`Scanning ${domain}...`} />}
      
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 cyber-grid">
        <div className="max-w-4xl mx-auto text-center z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-cyber-success rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">
              Advanced Reconnaissance Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Discover Hidden</span>
            <br />
            <span className="gradient-text text-shadow-cyber">
              Security Insights
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Comprehensive domain reconnaissance with DNS enumeration, SSL analysis,
            security headers inspection, and subdomain discovery.
          </motion.p>

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter domain (e.g., example.com)"
                  icon={Search}
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  error={error}
                  className="text-center sm:text-left"
                />
              </div>
              <Button
                onClick={handleScan}
                loading={isLoading}
                size="lg"
                className="whitespace-nowrap animate-glow"
              >
                Start Scan
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 justify-center glass rounded-xl px-4 py-3"
              >
                <feature.icon className="w-4 h-4 text-cyber-accent" />
                <span className="text-sm text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyber-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyber-success/5 rounded-full blur-3xl" />
      </section>
    </>
  );
}
