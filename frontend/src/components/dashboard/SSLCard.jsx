import Card from '../common/Card';
import { Lock, Calendar, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SSLCard({ ssl }) {
  if (!ssl) return null;

  const isExpired = ssl.is_expired || false;
  const isValid = ssl.is_valid !== false;
  const daysUntilExpiry = ssl.days_until_expiry;

  const getExpiryStatus = () => {
    if (isExpired) return { color: 'cyber-danger', icon: AlertTriangle, text: 'Expired' };
    if (daysUntilExpiry !== undefined && daysUntilExpiry <= 30) {
      return { color: 'cyber-warning', icon: AlertTriangle, text: `Expires in ${daysUntilExpiry} days` };
    }
    return { color: 'cyber-success', icon: CheckCircle, text: 'Valid' };
  };

  const expiryStatus = getExpiryStatus();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card
      title="SSL Certificate"
      icon={Lock}
      accentColor={isValid && !isExpired ? 'cyber-success' : 'cyber-danger'}
    >
      <div className="space-y-4">
        {/* Status banner */}
        <div className={`flex items-center gap-3 p-4 rounded-xl bg-${expiryStatus.color}/10 border border-${expiryStatus.color}/20`}>
          <expiryStatus.icon className={`w-5 h-5 text-${expiryStatus.color}`} />
          <span className={`font-medium text-${expiryStatus.color}`}>
            {expiryStatus.text}
          </span>
        </div>

        {/* Certificate details */}
        <div className="grid gap-3">
          {ssl.issuer && (
            <div className="p-3 rounded-lg bg-cyber-dark/30">
              <p className="text-xs text-gray-500 mb-1">Issuer</p>
              <p className="text-sm text-gray-200 font-mono">{ssl.issuer}</p>
            </div>
          )}

          {ssl.subject && (
            <div className="p-3 rounded-lg bg-cyber-dark/30">
              <p className="text-xs text-gray-500 mb-1">Subject</p>
              <p className="text-sm text-gray-200 font-mono">{ssl.subject}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {ssl.not_before && (
              <div className="p-3 rounded-lg bg-cyber-dark/30">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <p className="text-xs text-gray-500">Valid From</p>
                </div>
                <p className="text-sm text-gray-200">{formatDate(ssl.not_before)}</p>
              </div>
            )}

            {ssl.not_after && (
              <div className="p-3 rounded-lg bg-cyber-dark/30">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <p className="text-xs text-gray-500">Valid Until</p>
                </div>
                <p className="text-sm text-gray-200">{formatDate(ssl.not_after)}</p>
              </div>
            )}
          </div>

          {ssl.serial_number && (
            <div className="p-3 rounded-lg bg-cyber-dark/30">
              <p className="text-xs text-gray-500 mb-1">Serial Number</p>
              <p className="text-sm text-gray-200 font-mono truncate">{ssl.serial_number}</p>
            </div>
          )}

          {ssl.version && (
            <div className="p-3 rounded-lg bg-cyber-dark/30">
              <p className="text-xs text-gray-500 mb-1">Version</p>
              <p className="text-sm text-gray-200">TLS {ssl.version}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
