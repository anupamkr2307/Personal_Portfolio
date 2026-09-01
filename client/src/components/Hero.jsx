import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Terminal, Code2, Database, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { CodeTerminal } from './CodeTerminal';

export const Hero = ({ profile, socialLinks }) => {
  const name = profile?.name || "Anupam Kumar";
  const headline = profile?.title || "Web Developer | AI/ML Learner | Database Learner";
  const bio = profile?.bio || "I build modern web applications, full-stack systems and intelligent solutions while continuously exploring AI/ML and scalable databases.";
  const profileImage = profile?.profileImage || "/uploads/anupam_profile.jpg";
  const resumeUrl = profile?.resumeUrl || "#";

  const githubUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'github')?.url || "https://github.com/anupamkr2307";
  const linkedinUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'linkedin')?.url || "https://www.linkedin.com/in/anupam-kumar-7305a8280";
  const emailUrl = "mailto:" + (profile?.email || "anupamkr2307@gmail.com");

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/20 via-brand-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Profile Avatar Badge & Availability */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-600 to-cyan-400 shadow-lg shadow-brand-500/30">
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span>Seeking Software Developer Roles & Internships</span>
              </div>
            </motion.div>

            {/* Main Greeting & Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-gradient">{name}</span> 👋
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400 tracking-tight">
                {headline}
              </p>
            </motion.div>

            {/* Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-sm shadow-xl shadow-brand-500/25 flex items-center gap-2 group transition-all duration-200"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-all duration-200"
              >
                Contact Me
              </a>

              <a
                href={resumeUrl || "/Anupam_Kumar_Resume.pdf"}
                download="Anupam_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-slate-900/5 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:text-brand-500 border border-slate-300/80 dark:border-slate-800 font-medium text-sm flex items-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-brand-500" />
                <span>Download Resume PDF</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-brand-600 transition duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#0A66C2] transition duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={emailUrl}
                  aria-label="Send Email"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-rose-600 transition duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Code Terminal Workspace & Tech Badges */}
          <div className="lg:col-span-6 relative">
            {/* Tech Badges Floating Pill Accents */}
            <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-brand-400 border border-slate-700 shadow-xl backdrop-blur-md text-xs font-mono animate-float">
              <Code2 className="w-3.5 h-3.5 text-brand-400" />
              Full-Stack Engineering
            </div>
            <div className="absolute -bottom-6 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-emerald-400 border border-slate-700 shadow-xl backdrop-blur-md text-xs font-mono animate-float" style={{ animationDelay: '2s' }}>
              <Brain className="w-3.5 h-3.5 text-emerald-400" />
              AI/ML Models
            </div>

            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
