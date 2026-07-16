import Card from '../common/Card';
import { FileText, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  const stats = [
    {
      label: 'Modules Run',
      value: summary.modules_run || 0,
      icon: Activity,
      color: 'cyber-accent',
    },
    {
      label: 'Findings',
      value: summary.findings || 0,
      icon: summary.findings > 0 ? AlertTriangle : CheckCircle,
      color: summary.findings > 0 ? 'cyber-warning' : 'cyber-success',
    },
  ];

  return (
    <Card title="Scan Summary" icon={FileText} accentColor="cyber-accent">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-${stat.color}/5 border border-${stat.color}/20`}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
