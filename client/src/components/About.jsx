import React from 'react';
import { Award, Code2, Database, Brain, Sparkles, CheckCircle2, GraduationCap, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = ({ profile }) => {
  const aboutText = profile?.about || "I am a passionate software developer with strong analytical skills and hands-on experience in full-stack web development, machine learning algorithms, and relational/NoSQL databases. Dedicated to building reliable, high-performance web applications and intelligent systems.";
  const profileImage = profile?.profileImage || "/uploads/anupam_profile.jpg";

  const stats = [
    {
      label: "DSA Problems Solved",
      value: profile?.dsaSolved ? `${profile.dsaSolved}+` : "200+",
      sub: "LeetCode & GFG",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Full-Stack & ML Projects",
      value: profile?.projectsCount ? `${profile.projectsCount}+` : "4+",
      sub: "Production & Research",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Web Dev Internship",
      value: "Vault of Code",
      sub: "React & REST APIs",
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Hackathon Standing",
      value: "Top-5 Finalist",
      sub: "IgNITion Hackathon '25",
      icon: Award,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const focusAreas = [
    {
      title: "Full-Stack Web Development",
      description: "Building responsive, modern React frontends coupled with Express.js / Node.js RESTful API architectures and clean state management.",
      icon: Code2,
    },
    {
      title: "Machine Learning & AI",
      description: "Implementing predictive models using scikit-learn (Random Forest, Linear Regression) and HuggingFace NLP models (RoBERTa) for sentiment analytics.",
      icon: Brain,
    },
    {
      title: "Database Engineering",
      description: "Architecting relational SQL schemas (PostgreSQL, MySQL, SQLite) and Prisma ORM query optimizations for high throughput.",
      icon: Database,
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Developer Journey & Technical Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Combining computer science fundamentals with modern web engineering and data intelligence.
          </p>
        </div>

        {/* Dynamic Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4 shadow-lg`}>
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Profile Image & Bio & Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Photo Card & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-3xl overflow-hidden shadow-2xl p-2 bg-gradient-to-tr from-brand-600 via-brand-cyan to-brand-violet border border-slate-700/50">
              <div className="rounded-[22px] overflow-hidden bg-slate-900 aspect-[3/4] relative group">
                <img
                  src={profileImage}
                  alt={profile?.name || "Anupam Kumar"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                  <h4 className="text-sm font-bold text-white font-display">Anupam Kumar</h4>
                  <p className="text-xs font-mono text-brand-400">Web Developer | AI/ML Learner</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 glass-card p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-brand-500 font-bold">NAME:</span> Anupam Kumar
              </div>
              <div>
                <span className="text-brand-500 font-bold">LOCATION:</span> India 🇮🇳
              </div>
              <div>
                <span className="text-brand-500 font-bold">STATUS:</span> Open to Roles
              </div>
              <div>
                <span className="text-brand-500 font-bold">DEGREE:</span> B.Tech CSE ('26)
              </div>
            </div>
          </div>

          {/* Bio text & Focus Areas Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Passionate about building software products that solve real-world problems.
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {aboutText}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Whether optimizing a PostgreSQL database query, training an ML model for smart irrigation, or polishing a React component UI, I thrive on tackling technical challenges with clean, maintainable code.
            </p>

            <div className="space-y-4 pt-2">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-card p-4 sm:p-5 rounded-xl flex items-start gap-4 hover:border-brand-500/40 transition"
                  >
                    <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                        {area.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
