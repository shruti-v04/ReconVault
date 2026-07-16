import { motion } from 'framer-motion';
import { History as HistoryIcon, Globe, Calendar, AlertCircle, Trash2 } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { useScanContext } from '../context/ScanContext';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const { history, isLoading, error, refreshHistory } = useHistory();
  const { loadScanData } = useScanContext();
  const navigate = useNavigate();

  const handleViewScan = (item) => {
    if (item.results) {
      loadScanData(item.results, item.domain);
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <HistoryIcon className="w-6 h-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold text-white">Scan History</h1>
        </div>
        <button
          onClick={refreshHistory}
          disabled={isLoading}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Refresh
        </button>
      </motion.div>

      {/* Error state */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-cyber-danger/10 border border-cyber-danger/20 mb-6"
        >
          <AlertCircle className="w-5 h-5 text-cyber-danger" />
          <span className="text-cyber-danger">{error}</span>
        </motion.div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full"
          />
        </div>
      ) : history.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            No scan history yet
          </h3>
          <p className="text-gray-500">
            Perform your first scan to see results here
          </p>
        </motion.div>
      ) : (
        /* History list */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {history.map((item, index) => (
            <motion.div
              key={item.domain || index}
              variants={itemVariants}
              className="glass rounded-xl p-4 hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => handleViewScan(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-cyber-accent/10">
                    <Globe className="w-5 h-5 text-cyber-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-cyber-accent transition-colors">
                      {item.domain}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {item.scan_time
                          ? new Date(item.scan_time).toLocaleString()
                          : 'Unknown date'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {item.risk_score !== undefined && (
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.risk_score <= 30
                          ? 'bg-cyber-success/10 text-cyber-success'
                          : item.risk_score <= 60
                          ? 'bg-cyber-warning/10 text-cyber-warning'
                          : 'bg-cyber-danger/10 text-cyber-danger'
                      }`}
                    >
                      Risk: {item.risk_score}
                    </div>
                  )}
                  <span className="text-sm text-gray-400 group-hover:text-cyber-accent transition-colors">
                    View →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
