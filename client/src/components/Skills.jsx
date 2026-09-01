import React, { useState } from 'react';
import { Search, Code2, Terminal, Atom, Server, Brain, Database, Wrench, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const Skills = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'AI / ML', 'Databases', 'Tools'];

  const categoryIcons = {
    Programming: Code2,
    Frontend: Atom,
    Backend: Server,
    'AI / ML': Brain,
    Databases: Database,
    Tools: Wrench,
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 bg-slate-900/40 dark:bg-slate-950/50 relative border-y border-slate-200/40 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Skills & Competencies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Fetched dynamically from database API. Admin can add, edit, or reorder skills.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. React, C++)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-brand-500 transition"
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No skills match your search query.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredSkills.map((skill, idx) => {
              const CategoryIcon = categoryIcons[skill.category] || Layers;
              return (
                <motion.div
                  key={skill.id || skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (idx % 12) * 0.03 }}
                  className="glass-card p-4 rounded-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition">
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-400 transition">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                      {skill.category}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 to-brand-cyan rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
