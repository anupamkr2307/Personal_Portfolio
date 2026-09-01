import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { profileAPI, projectsAPI, skillsAPI, experienceAPI, educationAPI, achievementsAPI, socialLinksAPI } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Achievements } from '../components/Achievements';
import { ResumeSection } from '../components/ResumeSection';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { CanvasBackground } from '../components/CanvasBackground';
import { CursorFollower } from '../components/CursorFollower';

export const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileRes,
          projectsRes,
          skillsRes,
          expRes,
          eduRes,
          achRes,
          socialRes,
        ] = await Promise.all([
          profileAPI.get().catch(() => ({ data: { profile: null } })),
          projectsAPI.getAll().catch(() => ({ data: { projects: [] } })),
          skillsAPI.getAll().catch(() => ({ data: { skills: [] } })),
          experienceAPI.getAll().catch(() => ({ data: { experience: [] } })),
          educationAPI.getAll().catch(() => ({ data: { education: [] } })),
          achievementsAPI.getAll().catch(() => ({ data: { achievements: [] } })),
          socialLinksAPI.getPublic().catch(() => ({ data: { socialLinks: [] } })),
        ]);

        if (profileRes.data?.profile) setProfile(profileRes.data.profile);
        if (projectsRes.data?.projects) setProjects(projectsRes.data.projects);
        if (skillsRes.data?.skills) setSkills(skillsRes.data.skills);
        if (expRes.data?.experience) setExperience(expRes.data.experience);
        if (eduRes.data?.education) setEducation(eduRes.data.education);
        if (achRes.data?.achievements) setAchievements(achRes.data.achievements);
        if (socialRes.data?.socialLinks) setSocialLinks(socialRes.data.socialLinks);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{profile?.name ? `${profile.name} | Developer Portfolio` : 'Anupam Kumar | Software Developer Portfolio'}</title>
        <meta name="description" content={profile?.bio || 'Full-Stack Developer, AI/ML Learner & Database Enthusiast portfolio of Anupam Kumar.'} />
        <meta property="og:title" content={`${profile?.name || 'Anupam Kumar'} - Full-Stack Developer`} />
        <meta property="og:description" content={profile?.bio} />
      </Helmet>

      <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-brand-500/30 selection:text-brand-400">
        <CanvasBackground />
        <CursorFollower />
        <Navbar />

        <main>
          <Hero profile={profile} socialLinks={socialLinks} />
          <About profile={profile} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Education education={education} />
          <Achievements achievements={achievements} />
          <ResumeSection profile={profile} socialLinks={socialLinks} />
          <Contact profile={profile} socialLinks={socialLinks} />
        </main>

        <Footer socialLinks={socialLinks} />
        <BackToTop />
      </div>
    </>
  );
};
