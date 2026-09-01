import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Contact = ({ profile, socialLinks }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const email = profile?.email || 'anupamkr2307@gmail.com';
  const githubUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'github')?.url || 'https://github.com/anupamkr2307';
  const linkedinUrl = socialLinks?.find(s => s.platform.toLowerCase() === 'linkedin')?.url || 'https://www.linkedin.com/in/anupam-kumar-7305a8280';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('Please complete all form fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await contactAPI.submit(formData);
      if (res.data.success) {
        showToast(res.data.message || 'Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        showToast(res.data.message || 'Failed to send message.', 'error');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-500 uppercase px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Let's Build Something Intelligent Together
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Send me a message directly. Messages are saved securely in PostgreSQL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Contact Details
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Whether you have a software engineering role, full-stack project, AI/ML internship, or technical question, feel free to drop a message!
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <a
                href={`mailto:${email}`}
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-brand-500/50 transition group"
              >
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Email Address</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-400 transition">
                    {email}
                  </p>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-brand-500/50 transition group"
              >
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">GitHub Profile</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-400 transition">
                    github.com/anupamkr2307
                  </p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-brand-500/50 transition group"
              >
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">LinkedIn Profile</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-400 transition">
                    linkedin.com/in/anupam-kumar-7305a8280
                  </p>
                </div>
              </a>

              {/* Location Card */}
              <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Location</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    India 🇮🇳 (Available Remote & Onsite)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-6 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Software Developer Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-sm shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
