import { useState, useCallback } from 'react';
import { scanService } from '../services/api';

export function useScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);

  const performScan = useCallback(async (domain) => {
    if (!domain || isScanning) return null;

    setIsScanning(true);
    setScanError(null);

    try {
      const result = await scanService.scan(domain);
      setScanResult(result);
      return result;
    } catch (error) {
      setScanError(error.message);
      return null;
    } finally {
      setIsScanning(false);
    }
  }, [isScanning]);

  const resetScan = useCallback(() => {
    setScanResult(null);
    setScanError(null);
  }, []);

  return {
    isScanning,
    scanResult,
    scanError,
    performScan,
    resetScan,
  };
}
