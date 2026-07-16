import { useState, useEffect, useCallback } from 'react';
import { historyService } from '../services/api';

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await historyService.getHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const refreshHistory = useCallback(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    isLoading,
    error,
    refreshHistory,
  };
}
