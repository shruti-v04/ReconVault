import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export default function RiskScoreCard({ score = 0 }) {
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const getRiskLevel = () => {
    if (normalizedScore <= 30) return { label: 'Low Risk', color: 'cyber-success', icon: ShieldCheck };
    if (normalizedScore <= 60) return { label: 'Medium Risk', color: 'cyber-warning', icon: Shield };
    return { label: 'High Risk', color: 'cyber-danger', icon: ShieldAlert };
  };

  const riskLevel = getRiskLevel();
  const Icon = riskLevel.icon;

  const chartData = [
    { name: 'Risk', value: normalizedScore },
    { name: 'Safe', value: 100 - normalizedScore },
  ];

  const colors = {
    'cyber-success': ['#10b981', '#1f2937'],
    'cyber-warning': ['#f59e0b', '#1f2937'],
    'cyber-danger': ['#ef4444', '#1f2937'],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg bg-${riskLevel.color}/10`}>
          <Icon className={`w-5 h-5 text-${riskLevel.color}`} />
        </div>
        <h3 className="text-lg font-semibold text-white">Risk Score</h3>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[riskLevel.color][index]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
              className={`text-4xl font-bold text-${riskLevel.color}`}
            >
              {normalizedScore}
            </motion.span>
            <span className="text-sm text-gray-400">out of 100</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${riskLevel.color}/10 text-${riskLevel.color}`}>
          <Icon className="w-4 h-4" />
          {riskLevel.label}
        </span>
      </div>
    </motion.div>
  );
}
