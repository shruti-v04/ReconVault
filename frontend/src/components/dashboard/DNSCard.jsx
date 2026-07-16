import Card from '../common/Card';
import { Server } from 'lucide-react';

export default function DNSCard({ dns }) {
  if (!dns) return null;

  const recordTypes = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA'];

  const formatRecord = (record) => {
    if (typeof record === 'string') return record;
    if (typeof record === 'object') {
      return Object.entries(record)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
    return JSON.stringify(record);
  };

  return (
    <Card title="DNS Records" icon={Server} badge={`${Object.keys(dns).length} types`}>
      <div className="space-y-4">
        {recordTypes.map((type) => {
          const records = dns[type] || dns[type.toLowerCase()];
          if (!records || (Array.isArray(records) && records.length === 0)) return null;

          return (
            <div key={type} className="p-4 rounded-xl bg-cyber-dark/50 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono font-semibold text-cyber-accent">
                  {type}
                </span>
                <span className="text-xs text-gray-500">
                  {Array.isArray(records) ? `${records.length} record(s)` : '1 record'}
                </span>
              </div>
              <div className="space-y-1">
                {Array.isArray(records) ? (
                  records.map((record, idx) => (
                    <p key={idx} className="text-sm text-gray-300 font-mono break-all">
                      {formatRecord(record)}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-300 font-mono break-all">
                    {formatRecord(records)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
