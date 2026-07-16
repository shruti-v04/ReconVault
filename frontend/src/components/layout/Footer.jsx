import { Shield, Github, Twitter, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyber-accent" />
            <div>
              <span className="text-white font-semibold">ReconVault</span>
              <span className="text-gray-500 text-sm ml-2">
                Cybersecurity Reconnaissance Platform
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-cyber-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyber-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyber-accent transition-colors"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} ReconVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
