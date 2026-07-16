import Card from '../common/Card';
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const SECURITY_HEADERS = [
  { name: 'Content-Security-Policy', key: 'content-security-policy', importance: 'high' },
  { name: 'X-Frame-Options', key: 'x-frame-options', importance: 'high' },
  { name: 'X-Content-Type-Options', key: 'x-content-type-options', importance: 'medium' },
  { name: 'Strict-Transport-Security', key: 'strict-transport-security', importance: 'high' },
  { name: 'X-XSS-Protection', key: 'x-xss-protection', importance: 'low' },
  { name: 'Referrer-Policy', key: 'referrer-policy', importance: 'medium' },
  { name: 'Permissions-Policy', key: 'permissions-policy', importance: 'medium' },
];

export default function SecurityHeadersCard({ headers }) {
  if (!headers) return null;

  const normalizedHeaders = {};
  Object.keys(headers).forEach((key) => {
    normalizedHeaders[key.toLowerCase()] = headers[key];
  });

  const presentCount = SECURITY_HEADERS.filter(
    (h) => normalizedHeaders[h.key]
  ).length;

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'cyber-danger';
      case 'medium': return 'cyber-warning';
      default: return 'cyber-muted';
    }
  };

  return (
    <Card
      title="Security Headers"
      icon={ShieldCheck}
      badge={`${presentCount}/${SECURITY_HEADERS.length}`}
      accentColor={presentCount >= 5 ? 'cyber-success' : presentCount >= 3 ? 'cyber-warning' : 'cyber-danger'}
    >
      <div className="space-y-2">
        {SECURITY_HEADERS.map((header) => {
          const value = normalizedHeaders[header.key];
          const isPresent = !!value;
          const importanceColor = getImportanceColor(header.importance);

          return (
            <div
              key={header.key}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                isPresent ? 'bg-cyber-success/5' : 'bg-cyber-dark/30'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isPresent ? (
                  <CheckCircle className="w-4 h-4 text-cyber-success" />
                ) : (
                  <XCircle className={`w-4 h-4 text-${importanceColor}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{header.name}</p>
                  {!isPresent && header.importance === 'high' && (
                    <AlertTriangle className="w-3 h-3 text-cyber-warning" />
                  )}
                </div>
                {isPresent ? (
                  <p className="text-xs text-gray-400 font-mono mt-1 break-all">
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">Not configured</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
