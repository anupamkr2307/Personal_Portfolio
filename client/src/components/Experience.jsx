import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience = ({ experience = [] }) => {
  return (
    <section id="experience" className="py-20 bg-slate-900/30 dark:bg-slate-950/40 relative border-t border-slate-200/40 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Career Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Work history, internships, and key contributions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:via-brand-cyan before:to-transparent">
          {experience.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-mono text-sm">
              No experience records found.
            </div>
          ) : (
            experience.map((item, idx) => (
              <motion.div
                key={item.id || item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12"
              >
                {/* Timeline Dot Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-500/30 shrink-0 z-10 absolute left-0 sm:left-1/2 -translate-x-1/2">
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-2.5rem)] sm:w-[calc(50%-2rem)] ml-10 sm:ml-0 glass-card p-6 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono font-semibold">
                      {item.company}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.startDate} - {item.current ? 'Present' : item.endDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                    {item.role}
                  </h3>

                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {item.location}
                    </div>
                  )}

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  {item.bulletPoints && item.bulletPoints.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
                      {item.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
