import React from 'react';
import { Download, ExternalLink, GraduationCap, Briefcase, Code2, Trophy, Phone, Mail, Github, Linkedin, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResumeSection = ({ profile, socialLinks }) => {
  const resumeUrl = profile?.resumeUrl || '/Anupam_Kumar_Resume.pdf';
  const email = profile?.email || 'anupamkr2307@gmail.com';
  const phone = '9142090166';
  const githubUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'github')?.url || 'https://github.com/anupamkr2307';
  const linkedinUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'linkedin')?.url || 'https://www.linkedin.com/in/anupam-kumar-7305a8280';

  return (
    <section id="resume" className="py-20 bg-slate-900/40 dark:bg-slate-950/60 relative border-t border-slate-200/40 dark:border-slate-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Curriculum Vitae
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Interactive Software Resume
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Verified resume details for Anupam Kumar. You can view or download the PDF resume below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={resumeUrl}
              download="Anupam_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-xs shadow-xl shadow-brand-600/30 flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Resume</span>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Paper Resume View Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white text-slate-900 dark:bg-[#0f1523] dark:text-slate-100 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 font-sans space-y-8"
        >
          {/* Resume Header */}
          <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Anupam Kumar
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-500">
                <Github className="w-3.5 h-3.5" /> anupamkr2307
              </a>
              <span>|</span>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-500">
                <Linkedin className="w-3.5 h-3.5" /> anupam-kumar
              </a>
              <span>|</span>
              <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-brand-500">
                <Mail className="w-3.5 h-3.5" /> {email}
              </a>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {phone}
              </span>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Full-stack software developer skilled in <strong>React, Node.js, and Flask</strong>, with strong problem-solving abilities and a solid foundation in Data Structures, DBMS, and OOPs. Experienced in building scalable web applications and machine learning models using Python. Passionate about developing efficient and user-friendly solutions.
            </p>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Jaypee University of Engineering and Technology, Guna
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Bachelor of Technology in Computer Science
                </p>
              </div>
              <div className="text-left sm:text-right text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>2023 - 2027</span>
                <br />
                <span>Guna, MP</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Skills
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Programming Languages:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">C++, Python, JavaScript</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Frameworks & Libraries:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">React, Node.js, Flask, Bootstrap, Tailwind CSS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Machine Learning:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">scikit-learn, pandas, NumPy, Linear Regression</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Databases:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">MySQL, PostgreSQL, MongoDB, SQLite</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Tools & Platforms:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">Git, GitHub, VS Code, Jupyter Notebook</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                <span className="sm:col-span-4 font-semibold text-slate-900 dark:text-white font-mono">Core Concepts:</span>
                <span className="sm:col-span-8 text-slate-700 dark:text-slate-300">Data Structures & Algorithms, DBMS, OOPs, Problem Solving</span>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Work Experience
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Web Developer Intern – Vault of Codes <span className="font-normal text-slate-500">(Remote)</span>
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Jun 2025 – Jul 2025</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                <li>Built responsive <strong>React components</strong>, improving overall user experience across devices</li>
                <li>Integrated <strong>REST APIs</strong> using <strong>Node.js</strong> and <strong>Flask</strong> for seamless frontend-backend communication</li>
                <li>Used <strong>Git</strong> and <strong>GitHub</strong> for efficient version control and collaboration</li>
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Projects
            </h2>

            {/* Smart Irrigation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Smart Irrigation</h3>
                <a href="https://github.com/anupamkr2307/Smart-irrigation" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-500 hover:underline">
                  Live Demo
                </a>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                <li>Developed a smart irrigation system improving water efficiency by <strong>~30%</strong> using ML predictions</li>
                <li>Used IoT sensor data (soil moisture, temperature, humidity)</li>
                <li>Trained ML models with <strong>Python</strong> and <strong>scikit-learn</strong></li>
                <li>Deployed using <strong>Flask</strong></li>
              </ul>
            </div>

            {/* Auto Mind */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Auto Mind – Car Price Prediction</h3>
                <a href="https://github.com/anupamkr2307/Auto_Mind" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-500 hover:underline">
                  GitHub
                </a>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                <li>Built a car price prediction system achieving <strong>85% accuracy</strong> using <strong>Linear Regression</strong></li>
                <li>Utilized <strong>Python, scikit-learn, pandas, NumPy</strong> for data preprocessing and model training</li>
                <li>Developed a <strong>Flask-based web application</strong> enabling real-time price prediction</li>
                <li>Performed <strong>Exploratory Data Analysis (EDA)</strong> to identify key factors such as mileage, age, and brand impact on pricing</li>
              </ul>
            </div>

            {/* Mental Health Support */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Mental Health Support</h3>
                <a href="https://github.com/anupamkr2307" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-500 hover:underline">
                  GitHub
                </a>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                <li>Developed a full-stack web application enabling secure doctor–patient interactions for mental health support</li>
                <li>Implemented <strong>role-based authentication</strong> with separate dashboards for doctors and patients</li>
                <li>Built appointment management and <strong>real-time chat</strong> using AJAX polling for communication</li>
                <li>Integrated <strong>AI-based emotion detection</strong> using a <strong>RoBERTa model</strong> to analyze user sentiment</li>
                <li>Added prescription management, UPI payment QR generation, and responsive mobile-friendly UI</li>
              </ul>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1">
              Achievements
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
              <li>Solved <strong>200+ DSA problems</strong> across LeetCode, Codeforces, and CodeChef</li>
              <li>Secured <strong>Top-5 position</strong> at <strong>IgNITion Tech Fest 2025 Hackathon</strong></li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
