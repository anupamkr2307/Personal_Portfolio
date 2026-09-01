import React from 'react';
import { Trophy, Code, Briefcase, Rocket, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Achievements = ({ achievements = [] }) => {
  const iconMap = {
    Trophy,
    Code,
    Briefcase,
    Rocket,
    Star,
  };

  return (
    <section id="achievements" className="py-20 bg-slate-900/30 dark:bg-slate-950/50 relative border-y border-slate-200/40 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Recognitions & Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Key Achievements & Milestones
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Competitive programming statistics, hackathon finishes, and project recognitions.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.length === 0 ? (
            <div className="col-span-full text-center py-10 text-slate-500 font-mono text-sm">
              No achievement records found.
            </div>
          ) : (
            achievements.map((ach, idx) => {
              const IconComponent = iconMap[ach.icon] || Trophy;
              return (
                <motion.div
                  key={ach.id || ach.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {ach.date && (
                        <span className="text-[11px] font-mono text-slate-500 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          {ach.date}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1 group-hover:text-amber-400 transition">
                      {ach.title}
                    </h3>
                    {ach.subtitle && (
                      <p className="text-xs font-mono text-brand-500 dark:text-brand-400 font-semibold mb-2">
                        {ach.subtitle}
                      </p>
                    )}
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
