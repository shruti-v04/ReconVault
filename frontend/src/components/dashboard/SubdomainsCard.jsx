import { useState } from 'react';
import Card from '../common/Card';
import { Globe, Search, ExternalLink } from 'lucide-react';

export default function SubdomainsCard({ subdomains }) {
  const [search, setSearch] = useState('');

  if (!subdomains || !Array.isArray(subdomains) || subdomains.length === 0) {
    return (
      <Card title="Subdomains" icon={Globe} accentColor="cyber-accent">
        <p className="text-gray-500 text-sm">No subdomains discovered</p>
      </Card>
    );
  }

  const filteredSubdomains = subdomains.filter((subdomain) =>
    subdomain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card
      title="Subdomains"
      icon={Globe}
      badge={`${subdomains.length} found`}
      accentColor="cyber-accent"
    >
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search subdomains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cyber-dark/50 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-accent/50"
          />
        </div>

        {/* Subdomain list */}
        <div className="max-h-64 overflow-y-auto space-y-1 pr-2">
          {filteredSubdomains.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No matching subdomains
            </p>
          ) : (
            filteredSubdomains.map((subdomain, index) => (
              <a
                key={index}
                href={`https://${subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark/30 hover:bg-cyber-accent/10 transition-colors group"
              >
                <span className="text-sm text-gray-300 font-mono truncate">
                  {subdomain}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyber-accent transition-colors flex-shrink-0 ml-2" />
              </a>
            ))
          )}
        </div>

        {filteredSubdomains.length > 0 && (
          <p className="text-xs text-gray-500 text-center">
            Showing {filteredSubdomains.length} of {subdomains.length} subdomains
          </p>
        )}
      </div>
    </Card>
  );
}
