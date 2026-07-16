import Card from '../common/Card';
import { FileSearch, Calendar, Building, User, Globe } from 'lucide-react';

export default function WHOISCard({ whois }) {
  if (!whois) return null;

  const fields = [
    { key: 'registrar', label: 'Registrar', icon: Building },
    { key: 'registrant', label: 'Registrant', icon: User },
    { key: 'creation_date', label: 'Created', icon: Calendar },
    { key: 'expiration_date', label: 'Expires', icon: Calendar },
    { key: 'updated_date', label: 'Updated', icon: Calendar },
    { key: 'name_servers', label: 'Name Servers', icon: Globe },
    { key: 'status', label: 'Status', icon: FileSearch },
  ];

  const formatValue = (value) => {
    if (!value) return 'N/A';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card title="WHOIS Information" icon={FileSearch} accentColor="cyber-accent">
      <div className="space-y-3">
        {fields.map(({ key, label, icon: Icon }) => {
          const value = whois[key];
          if (!value) return null;

          const displayValue = key.includes('date') 
            ? formatDate(value) 
            : formatValue(value);

          return (
            <div
              key={key}
              className="flex items-start gap-3 p-3 rounded-lg bg-cyber-dark/30"
            >
              <Icon className="w-4 h-4 text-cyber-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-gray-200 break-all font-mono">
                  {displayValue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
