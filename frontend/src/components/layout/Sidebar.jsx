import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useHistory } from '../../hooks/useHistory';
import { useScanContext } from '../../context/ScanContext';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { history, isLoading, refreshHistory } = useHistory();
  const { loadScanData, currentDomain } = useScanContext();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-cyber-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-cyber-danger" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-cyber-warning" />;
    }
  };

  const handleHistoryClick = (item) => {
    if (item.results) {
      loadScanData(item.results, item.domain);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      className="fixed left-0 top-16 bottom-0 glass border-r border-white/5 z-30 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <History className="w-5 h-5 text-cyber-accent" />
              <span className="font-semibold text-white">Scan History</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-cyber-accent border-t-transparent rounded-full"
            />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 px-4">
            {!isCollapsed && (
              <p className="text-gray-500 text-sm">No scans yet</p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {history.map((item, index) => (
              <motion.button
                key={item.domain || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleHistoryClick(item)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl
                  transition-all duration-200 text-left
                  ${currentDomain === item.domain 
                    ? 'bg-cyber-accent/20 border border-cyber-accent/30' 
                    : 'hover:bg-white/5'
                  }
                `}
              >
                <div className="flex-shrink-0">
                  {isCollapsed ? (
                    <Globe className="w-5 h-5 text-cyber-accent" />
                  ) : (
                    getStatusIcon(item.status)
                  )}
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-white font-medium truncate text-sm">
                        {item.domain}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>
                          {item.scan_time 
                            ? new Date(item.scan_time).toLocaleDateString() 
                            : 'Unknown'
                          }
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Refresh button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/5">
          <button
            onClick={refreshHistory}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
              text-sm text-gray-400 hover:text-white hover:bg-white/5
              transition-colors disabled:opacity-50"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <History className="w-4 h-4" />
            </motion.div>
            Refresh
          </button>
        </div>
      )}
    </motion.aside>
  );
}
