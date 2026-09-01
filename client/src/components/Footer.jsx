import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = ({ socialLinks }) => {
  const githubUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'github')?.url || 'https://github.com/anupamkr2307';
  const linkedinUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'linkedin')?.url || 'https://www.linkedin.com/in/anupam-kumar-7305a8280';

  return (
    <footer className="bg-white dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/60">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold font-display text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span>Anupam<span className="text-brand-500">.dev</span></span>
          </Link>

          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 text-center md:text-left">
            Web Developer | AI/ML Learner | Database Enthusiast
          </p>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:anupamkr2307@gmail.com"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} Anupam Kumar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Express, PostgreSQL & Prisma
          </p>
        </div>
      </div>
    </footer>
  );
};
