import React from 'react';
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Education = ({ education = [] }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Academic Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Education & Coursework
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Formal computer science education and core theoretical subjects.
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {education.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-mono text-sm">
              No education records found.
            </div>
          ) : (
            education.map((edu, idx) => (
              <motion.div
                key={edu.id || edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                        {edu.institution} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ''}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono self-start sm:self-auto border border-slate-200 dark:border-slate-700">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                  </span>
                </div>

                {/* Coursework Tags */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                      Relevant Coursework:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700/50"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements List */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Academic & Extracurricular Highlights:
                    </div>
                    <ul className="space-y-1.5">
                      {edu.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
