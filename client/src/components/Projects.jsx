import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Github, ExternalLink, ArrowRight, Sparkles, Code2, Layers, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesFeatured = !onlyFeatured || project.featured;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      (project.technologies && project.technologies.some(t => t.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesFeatured && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Featured Projects & Case Studies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Database-driven showcase featuring full-stack platforms, ML systems, and NLP applications.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Featured toggle button */}
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                onlyFeatured
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Featured Only</span>
            </button>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-mono text-sm">
            No projects found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 transition-all duration-300 shadow-lg"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent" />

                    {/* Category & Featured Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-mono border border-slate-700/60">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-[11px] shadow-lg">
                          <Star className="w-3 h-3 fill-slate-950" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-brand-400 transition">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-800/60 mt-4">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-brand-600 transition"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Project Demo"
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-emerald-600 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition group/link"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
