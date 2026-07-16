import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Globe, Clock, RefreshCw } from 'lucide-react';
import { useScanContext } from '../context/ScanContext';
import { reportService } from '../services/api';
import Button from '../components/common/Button';
import RiskScoreCard from '../components/dashboard/RiskScoreCard';
import SummaryCard from '../components/dashboard/SummaryCard';
import DNSCard from '../components/dashboard/DNSCard';
import WHOISCard from '../components/dashboard/WHOISCard';
import SSLCard from '../components/dashboard/SSLCard';
import SecurityHeadersCard from '../components/dashboard/SecurityHeadersCard';
import TechnologiesCard from '../components/dashboard/TechnologiesCard';
import SubdomainsCard from '../components/dashboard/SubdomainsCard';
import FindingsCard from '../components/dashboard/FindingsCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { scanData, currentDomain, isLoading, executeScan } = useScanContext();

  useEffect(() => {
    if (!scanData && !isLoading) {
      navigate('/');
    }
  }, [scanData, isLoading, navigate]);

  if (!scanData) {
    return null;
  }

  const { scan_info, summary, results, findings } = scanData;

  const handleDownloadReport = async () => {
    try {
      await reportService.downloadReport(currentDomain);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  const handleRescan = async () => {
    if (currentDomain) {
      await executeScan(currentDomain);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-cyber-accent" />
              <h1 className="text-2xl font-bold text-white">{currentDomain}</h1>
            </div>
            {scan_info?.scan_time && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  Scanned {new Date(scan_info.scan_time).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              icon={RefreshCw}
              onClick={handleRescan}
              disabled={isLoading}
            >
              Rescan
            </Button>
            <Button
              variant="primary"
              icon={Download}
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Risk Score */}
        <motion.div variants={itemVariants}>
          <RiskScoreCard score={summary?.risk_score} />
        </motion.div>

        {/* Right columns - Summary and Findings */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SummaryCard summary={summary} />
        </motion.div>

        {/* Findings - Full width */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <FindingsCard findings={findings} />
        </motion.div>

        {/* DNS */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DNSCard dns={results?.dns} />
        </motion.div>

        {/* WHOIS */}
        <motion.div variants={itemVariants}>
          <WHOISCard whois={results?.whois} />
        </motion.div>

        {/* SSL */}
        <motion.div variants={itemVariants}>
          <SSLCard ssl={results?.ssl} />
        </motion.div>

        {/* Security Headers */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SecurityHeadersCard headers={results?.security_headers} />
        </motion.div>

        {/* Technologies */}
        <motion.div variants={itemVariants}>
          <TechnologiesCard technologies={results?.technologies} />
        </motion.div>

        {/* Subdomains */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SubdomainsCard subdomains={results?.subdomains} />
        </motion.div>
      </div>
    </motion.div>
  );
}
