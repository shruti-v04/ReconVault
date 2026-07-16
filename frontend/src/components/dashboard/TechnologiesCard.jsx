import Card from '../common/Card';
import { Cpu, Code, Server, Database, Globe } from 'lucide-react';

const CATEGORY_ICONS = {
  'Web servers': Server,
  'Programming languages': Code,
  'JavaScript frameworks': Code,
  'Databases': Database,
  'CDN': Globe,
  'CMS': Cpu,
  default: Cpu,
};

export default function TechnologiesCard({ technologies }) {
  if (!technologies) return null;

  const techArray = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'object'
    ? Object.entries(technologies).flatMap(([category, techs]) =>
        Array.isArray(techs)
          ? techs.map((t) => (typeof t === 'string' ? { name: t, category } : { ...t, category }))
          : [{ name: String(techs), category }]
      )
    : [];

  if (techArray.length === 0) {
    return (
      <Card title="Technologies" icon={Cpu} accentColor="cyber-accent">
        <p className="text-gray-500 text-sm">No technologies detected</p>
      </Card>
    );
  }

  const getCategoryIcon = (category) => {
    return CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
  };

  return (
    <Card
      title="Technologies"
      icon={Cpu}
      badge={`${techArray.length} detected`}
      accentColor="cyber-accent"
    >
      <div className="flex flex-wrap gap-2">
        {techArray.map((tech, index) => {
          const name = typeof tech === 'string' ? tech : tech.name;
          const category = tech.category;
          const Icon = getCategoryIcon(category);

          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-accent/10 border border-cyber-accent/20"
            >
              <Icon className="w-4 h-4 text-cyber-accent" />
              <span className="text-sm text-gray-200">{name}</span>
              {tech.version && (
                <span className="text-xs text-gray-500">{tech.version}</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
