import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Play, Database, Brain, Code, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export const CodeTerminal = () => {
  const [activeTab, setActiveTab] = useState('developer.ts');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'developer.ts', label: 'developer.ts', icon: Code },
    { id: 'skills.json', label: 'stack.json', icon: Database },
    { id: 'ai_engine.py', label: 'ai_engine.py', icon: Brain },
  ];

  const codeSnippets = {
    'developer.ts': `const developer: SoftwareEngineer = {
  name: "Anupam Kumar",
  headline: "Web Developer | AI/ML Learner | Database Learner",
  interests: [
    "Full-Stack Web Engineering",
    "Machine Learning & Sentiment AI",
    "Scalable Relational & NoSQL Databases",
    "Data Structures & Algorithms (200+ Solved)"
  ],
  education: "B.Tech Computer Science & Engineering",
  status: "Available for Internships & Software Roles",
  location: "India 🇮🇳",
  contact: () => fetch("/api/contact")
};

export default developer;`,

    'stack.json': `{
  "core": ["Full-Stack", "AI/ML", "Database Systems"],
  "frontend": ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  "backend": ["Node.js", "Express.js", "Flask", "REST APIs"],
  "ai_ml": ["Python", "NumPy", "pandas", "scikit-learn", "Random Forest"],
  "databases": ["PostgreSQL", "MySQL", "SQLite", "MongoDB"],
  "tools": ["Git", "GitHub", "VS Code", "Jupyter"]
}`,

    'ai_engine.py': `import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Smart Irrigation Predictor by Anupam Kumar
def predict_irrigation_need(moisture, temp, humidity):
    model = RandomForestClassifier(n_estimators=100)
    # Model trained on soil microclimate sensor telemetry
    prediction = model.predict([[moisture, temp, humidity]])
    return {
        "status": "Optimal",
        "irrigate": bool(prediction[0]),
        "confidence": 0.96
    }`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 dark:border-slate-800 bg-[#0d1117] text-slate-200 font-mono text-xs sm:text-sm"
    >
      {/* Terminal Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 font-sans flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            anupam@workspace ~ zsh
          </span>
        </div>

        {/* Tab Switches */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1f242d] text-brand-400 font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1f242d] text-slate-300 hover:text-white border border-slate-700/60 text-xs transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display Body */}
      <div className="p-4 sm:p-6 overflow-x-auto min-h-[260px] bg-[#0d1117] leading-relaxed">
        <pre className="text-slate-300">
          <code>
            {codeSnippets[activeTab].split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-slate-600 select-none text-right text-xs">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Terminal Status Bar Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-slate-800 text-[11px] text-slate-400 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            REST API Online
          </span>
          <span className="hidden sm:inline">• UTF-8</span>
          <span className="hidden sm:inline">• Node.js / PostgreSQL</span>
        </div>
        <span className="text-brand-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Anupam Portfolio v1.0
        </span>
      </div>
    </motion.div>
  );
};
