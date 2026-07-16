import { createContext, useContext, useState, useCallback } from 'react';
import { scanService } from '../services/api';

const ScanContext = createContext(null);

export function ScanProvider({ children }) {
  const [scanData, setScanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDomain, setCurrentDomain] = useState('');

  const executeScan = useCallback(async (domain) => {
    setIsLoading(true);
    setError(null);
    setCurrentDomain(domain);

    try {
      const data = await scanService.scan(domain);
      setScanData(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Failed to scan domain';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearScan = useCallback(() => {
    setScanData(null);
    setError(null);
    setCurrentDomain('');
  }, []);

  const loadScanData = useCallback((data, domain) => {
    setScanData(data);
    setCurrentDomain(domain);
    setError(null);
  }, []);

  const value = {
    scanData,
    isLoading,
    error,
    currentDomain,
    executeScan,
    clearScan,
    loadScanData,
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScanContext() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScanContext must be used within a ScanProvider');
  }
  return context;
}
