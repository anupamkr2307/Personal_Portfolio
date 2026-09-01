import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, ExternalLink, Code2, Layers, CheckCircle2, AlertTriangle, Cpu, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsAPI.getBySlug(slug)
      .then(res => {
        if (res.data.success) {
          setProject(res.data.project);
        }
      })
      .catch(err => {
        console.error('Failed to load project details:', err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-slate-400 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading project case study...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold font-display">Project Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md">
          The requested project page does not exist or has been removed from the database.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Case Study - Anupam Kumar`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
        <Navbar />

        <main className="pt-28 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Back Navigation Link */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Projects
            </button>

            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono border border-brand-500/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                {project.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-lg hover:bg-brand-600 transition"
                  >
                    <Github className="w-4 h-4" /> View GitHub Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-500 transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Featured Hero Banner Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[460px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technologies Badges Bar */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Technologies & Tools Used:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-500/10 text-brand-400 text-xs font-mono font-semibold border border-brand-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Case Study Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem Statement */}
              {project.problemStatement && (
                <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-sm font-display">
                    <AlertTriangle className="w-4 h-4" /> Problem Statement
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm font-display">
                    <CheckCircle2 className="w-4 h-4" /> Implemented Solution
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Long Description Overview */}
            {project.longDescription && (
              <div className="glass-card p-8 rounded-2xl space-y-4 border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  System Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>
            )}

            {/* System Architecture & Technical Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.architecture && (
                <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-brand-400 font-bold text-sm font-display">
                    <Cpu className="w-4 h-4" /> System Architecture
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-mono">
                    {project.architecture}
                  </p>
                </div>
              )}

              {project.challenges && (
                <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-display">
                    <Layers className="w-4 h-4" /> Engineering Challenges
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}
            </div>

            {/* Results & Key Metrics */}
            {project.results && (
              <div className="glass-card p-6 rounded-2xl space-y-3 border border-emerald-500/30 bg-emerald-950/10">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-display">
                  <CheckCircle2 className="w-4 h-4" /> Project Results & Metrics
                </div>
                <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Project Image Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-52">
                      <img src={imgUrl} alt={`Gallery screenshot ${gIdx + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};
