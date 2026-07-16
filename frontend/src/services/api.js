import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes for scan operations
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    console.error('[API Error]', message);
    return Promise.reject(new Error(message));
  }
);

export const scanService = {
  /**
   * Initiates a scan for the given domain
   * @param {string} domain - Domain to scan
   * @returns {Promise<Object>} Scan results
   */
  scan: async (domain) => {
    const response = await apiClient.post('/scan', { domain });
    return response.data;
  },
};

export const historyService = {
  /**
   * Fetches scan history
   * @returns {Promise<Array>} List of previous scans
   */
  getHistory: async () => {
    const response = await apiClient.get('/history');
    return response.data;
  },
};

export const reportService = {
  /**
   * Downloads PDF report for a domain
   * @param {string} domain - Domain to get report for
   */
  downloadReport: async (domain) => {
    const response = await apiClient.get(`/report/${encodeURIComponent(domain)}`, {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reconvault-report-${domain}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

export default apiClient;
