import Card from '../common/Card';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertTriangle,
    color: 'cyber-danger',
    bg: 'bg-cyber-danger/10',
    border: 'border-cyber-danger/30',
  },
  high: {
    icon: AlertTriangle,
    color: 'cyber-danger',
    bg: 'bg-cyber-danger/10',
    border: 'border-cyber-danger/30',
  },
  medium: {
    icon: AlertCircle,
    color: 'cyber-warning',
    bg: 'bg-cyber-warning/10',
    border: 'border-cyber-warning/30',
  },
  low: {
    icon: Info,
    color: 'cyber-accent',
    bg: 'bg-cyber-accent/10',
    border: 'border-cyber-accent/30',
  },
  info: {
    icon: Info,
    color: 'cyber-muted',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
  },
};

export default function FindingsCard({ findings }) {
  if (!findings || !Array.isArray(findings) || findings.length === 0) {
    return (
      <Card title="Security Findings" icon={CheckCircle} accentColor="cyber-success">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-cyber-success/10 border border-cyber-success/20">
          <CheckCircle className="w-5 h-5 text-cyber-success" />
          <span className="text-cyber-success font-medium">
            No security issues detected
          </span>
        </div>
      </Card>
    );
  }

  const sortedFindings = [...findings].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    return (severityOrder[a.severity?.toLowerCase()] || 4) - (severityOrder[b.severity?.toLowerCase()] || 4);
  });

  const criticalCount = findings.filter(
    (f) => ['critical', 'high'].includes(f.severity?.toLowerCase())
  ).length;

  return (
    <Card
      title="Security Findings"
      icon={AlertTriangle}
      badge={`${findings.length} issues`}
      accentColor={criticalCount > 0 ? 'cyber-danger' : 'cyber-warning'}
    >
      <div className="space-y-3">
        {sortedFindings.map((finding, index) => {
          const severity = finding.severity?.toLowerCase() || 'info';
          const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.info;
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`p-4 rounded-xl ${config.bg} border ${config.border}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 text-${config.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">
                      {finding.title || finding.name || 'Finding'}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-${config.color}/20 text-${config.color} uppercase`}>
                      {severity}
                    </span>
                  </div>
                  {finding.description && (
                    <p className="text-sm text-gray-400">{finding.description}</p>
                  )}
                  {finding.recommendation && (
                    <div className="mt-2 p-2 rounded bg-cyber-dark/30">
                      <p className="text-xs text-gray-500 mb-1">Recommendation</p>
                      <p className="text-sm text-gray-300">{finding.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
