import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Upload,
  ExternalLink,
  ShieldCheck,
  Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  analyticsAPI,
  profileAPI,
  projectsAPI,
  skillsAPI,
  experienceAPI,
  educationAPI,
  achievementsAPI,
  socialLinksAPI,
  contactAPI,
  uploadAPI,
} from '../services/api';

export const AdminDashboardPage = () => {
  const { logout, admin } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Stats & Analytics State
  const [stats, setStats] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [achievementsList, setAchievementsList] = useState([]);
  const [socialLinksList, setSocialLinksList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Controls
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        profileRes,
        projectsRes,
        skillsRes,
        expRes,
        eduRes,
        achRes,
        socialRes,
        messagesRes,
      ] = await Promise.all([
        analyticsAPI.getStats().catch(() => ({ data: { stats: null } })),
        profileAPI.get().catch(() => ({ data: { profile: {} } })),
        projectsAPI.getAll().catch(() => ({ data: { projects: [] } })),
        skillsAPI.getAll().catch(() => ({ data: { skills: [] } })),
        experienceAPI.getAll().catch(() => ({ data: { experience: [] } })),
        educationAPI.getAll().catch(() => ({ data: { education: [] } })),
        achievementsAPI.getAll().catch(() => ({ data: { achievements: [] } })),
        socialLinksAPI.getAllAdmin().catch(() => ({ data: { socialLinks: [] } })),
        contactAPI.getMessages().catch(() => ({ data: { messages: [] } })),
      ]);

      if (statsRes.data?.stats) setStats(statsRes.data.stats);
      if (profileRes.data?.profile) setProfileData(profileRes.data.profile);
      if (projectsRes.data?.projects) setProjectsList(projectsRes.data.projects);
      if (skillsRes.data?.skills) setSkillsList(skillsRes.data.skills);
      if (expRes.data?.experience) setExperienceList(expRes.data.experience);
      if (eduRes.data?.education) setEducationList(eduRes.data.education);
      if (achRes.data?.achievements) setAchievementsList(achRes.data.achievements);
      if (socialRes.data?.socialLinks) setSocialLinksList(socialRes.data.socialLinks);
      if (messagesRes.data?.messages) setMessagesList(messagesRes.data.messages);
    } catch (err) {
      showToast('Failed to load dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, fieldName = 'image') => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      const res = await uploadAPI.uploadImage(data);
      if (res.data.success) {
        setFormData(prev => ({ ...prev, [fieldName]: res.data.url }));
        showToast('Image uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast('Image upload failed.', 'error');
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await profileAPI.update(profileData);
      if (res.data.success) {
        showToast('Portfolio profile updated successfully!', 'success');
        setProfileData(res.data.profile);
      }
    } catch (err) {
      showToast('Failed to update profile.', 'error');
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'project') {
        const payload = { ...formData };
        if (typeof payload.technologies === 'string') {
          payload.technologies = payload.technologies.split(',').map(t => t.trim()).filter(Boolean);
        }
        if (editingItem) {
          await projectsAPI.update(editingItem.id, payload);
          showToast('Project updated.', 'success');
        } else {
          await projectsAPI.create(payload);
          showToast('Project created.', 'success');
        }
      } else if (modalType === 'skill') {
        if (editingItem) {
          await skillsAPI.update(editingItem.id, formData);
          showToast('Skill updated.', 'success');
        } else {
          await skillsAPI.create(formData);
          showToast('Skill created.', 'success');
        }
      } else if (modalType === 'experience') {
        const payload = { ...formData };
        if (typeof payload.bulletPoints === 'string') {
          payload.bulletPoints = payload.bulletPoints.split('\n').filter(Boolean);
        }
        if (editingItem) {
          await experienceAPI.update(editingItem.id, payload);
          showToast('Experience updated.', 'success');
        } else {
          await experienceAPI.create(payload);
          showToast('Experience created.', 'success');
        }
      } else if (modalType === 'education') {
        const payload = { ...formData };
        if (typeof payload.coursework === 'string') {
          payload.coursework = payload.coursework.split(',').map(c => c.trim()).filter(Boolean);
        }
        if (editingItem) {
          await educationAPI.update(editingItem.id, payload);
          showToast('Education updated.', 'success');
        } else {
          await educationAPI.create(payload);
          showToast('Education created.', 'success');
        }
      } else if (modalType === 'achievement') {
        if (editingItem) {
          await achievementsAPI.update(editingItem.id, formData);
          showToast('Achievement updated.', 'success');
        } else {
          await achievementsAPI.create(formData);
          showToast('Achievement created.', 'success');
        }
      } else if (modalType === 'social') {
        if (editingItem) {
          await socialLinksAPI.update(editingItem.id, formData);
          showToast('Social link updated.', 'success');
        } else {
          await socialLinksAPI.create(formData);
          showToast('Social link created.', 'success');
        }
      }

      setModalType(null);
      setEditingItem(null);
      setFormData({});
      loadAllAdminData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed.', 'error');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (type === 'project') await projectsAPI.delete(id);
      if (type === 'skill') await skillsAPI.delete(id);
      if (type === 'experience') await experienceAPI.delete(id);
      if (type === 'education') await educationAPI.delete(id);
      if (type === 'achievement') await achievementsAPI.delete(id);
      if (type === 'social') await socialLinksAPI.delete(id);
      if (type === 'message') await contactAPI.deleteMessage(id);

      showToast('Item deleted successfully.', 'success');
      loadAllAdminData();
    } catch (err) {
      showToast('Failed to delete item.', 'error');
    }
  };

  const openCreateModal = (type, defaultData = {}) => {
    setModalType(type);
    setEditingItem(null);
    setFormData(defaultData);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    const copy = { ...item };
    if (Array.isArray(copy.technologies)) copy.technologies = copy.technologies.join(', ');
    if (Array.isArray(copy.bulletPoints)) copy.bulletPoints = copy.bulletPoints.join('\n');
    if (Array.isArray(copy.coursework)) copy.coursework = copy.coursework.join(', ');
    setFormData(copy);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: projectsList.length },
    { id: 'skills', label: 'Skills', icon: Code2, count: skillsList.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: experienceList.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: educationList.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: achievementsList.length },
    { id: 'socials', label: 'Social Links', icon: LinkIcon, count: socialLinksList.length },
    { id: 'messages', label: 'Messages', icon: Mail, count: messagesList.length },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Anupam Portfolio</title>
      </Helmet>

      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-brand-500/30 selection:text-brand-400">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0d1117] border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2 pt-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-lg">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold font-display text-white">Admin Panel</h1>
                <p className="text-[11px] font-mono text-slate-400">{admin?.email || 'anupamkr2307@gmail.com'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Portfolio
            </a>

            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-display text-white">Portfolio System Overview</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Real-time database metrics & visitor analytics.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">TOTAL PROJECTS</span>
                  <p className="text-3xl font-extrabold text-white mt-1">{stats?.totalProjects || projectsList.length}</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">SKILLS IN DB</span>
                  <p className="text-3xl font-extrabold text-brand-400 mt-1">{stats?.totalSkills || skillsList.length}</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">TOTAL MESSAGES</span>
                  <p className="text-3xl font-extrabold text-amber-400 mt-1">{stats?.totalMessages || messagesList.length}</p>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">TOTAL VISITORS</span>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-1">{stats?.totalVisitors || 1}</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold font-display text-white">Recent Contact Form Messages</h3>
                {messagesList.length === 0 ? (
                  <p className="text-xs text-slate-500 font-mono py-4">No contact messages received yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="pb-3">NAME</th>
                          <th className="pb-3">EMAIL</th>
                          <th className="pb-3">SUBJECT</th>
                          <th className="pb-3">DATE</th>
                          <th className="pb-3">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {messagesList.slice(0, 5).map(m => (
                          <tr key={m.id} className="hover:bg-slate-800/30">
                            <td className="py-3 font-semibold text-white">{m.name}</td>
                            <td className="py-3 text-slate-300">{m.email}</td>
                            <td className="py-3 text-slate-300">{m.subject}</td>
                            <td className="py-3 text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                            <td className="py-3">
                              <button onClick={() => setActiveTab('messages')} className="text-brand-400 hover:underline">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-white">Portfolio Profile Settings</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Changes will immediately reflect on the public website.</p>
              </div>

              <form onSubmit={handleProfileSave} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">NAME</label>
                    <input
                      type="text"
                      value={profileData.name || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">PROFESSIONAL HEADLINE</label>
                    <input
                      type="text"
                      value={profileData.title || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">HERO SHORT BIO</label>
                  <textarea
                    rows={2}
                    value={profileData.bio || ''}
                    onChange={(e) => setProfileData(p => ({ ...p, bio: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">ABOUT SECTION DETAILED TEXT</label>
                  <textarea
                    rows={4}
                    value={profileData.about || ''}
                    onChange={(e) => setProfileData(p => ({ ...p, about: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={profileData.email || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">GITHUB URL</label>
                    <input
                      type="text"
                      value={profileData.githubUrl || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, githubUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">LINKEDIN URL</label>
                    <input
                      type="text"
                      value={profileData.linkedinUrl || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, linkedinUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">RESUME URL</label>
                    <input
                      type="text"
                      value={profileData.resumeUrl || ''}
                      onChange={(e) => setProfileData(p => ({ ...p, resumeUrl: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">DSA PROBLEMS SOLVED</label>
                    <input
                      type="number"
                      value={profileData.dsaSolved || 200}
                      onChange={(e) => setProfileData(p => ({ ...p, dsaSolved: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <button type="submit" className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg">
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Project Showcase CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Manage all projects stored in database.</p>
                </div>
                <button
                  onClick={() => openCreateModal('project')}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projectsList.map(project => (
                  <div key={project.id} className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={project.image} alt={project.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          {project.title}
                          {project.featured && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Featured</span>}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{project.category} • slug: /{project.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button onClick={() => openEditModal('project', project)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('project', project.id)} className="p-2 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Skills CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Add, update, or remove dynamic skills.</p>
                </div>
                <button
                  onClick={() => openCreateModal('skill', { category: 'Programming', proficiency: 80 })}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skillsList.map(skill => (
                  <div key={skill.id} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <p className="text-[11px] font-mono text-slate-400">{skill.category} ({skill.proficiency}%)</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEditModal('skill', skill)} className="p-1.5 text-slate-400 hover:text-white">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete('skill', skill.id)} className="p-1.5 text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Experience CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Manage career history entries.</p>
                </div>
                <button
                  onClick={() => openCreateModal('experience', { current: true, startDate: '2024', endDate: 'Present' })}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </div>

              <div className="space-y-4">
                {experienceList.map(exp => (
                  <div key={exp.id} className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role} @ {exp.company}</h3>
                      <p className="text-xs font-mono text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('experience', exp)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('experience', exp.id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Education CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Manage educational entries.</p>
                </div>
                <button
                  onClick={() => openCreateModal('education')}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Education
                </button>
              </div>

              <div className="space-y-4">
                {educationList.map(edu => (
                  <div key={edu.id} className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                      <p className="text-xs font-mono text-slate-400">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('education', edu)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('education', edu.id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Achievements CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Manage honors and competition finishes.</p>
                </div>
                <button
                  onClick={() => openCreateModal('achievement', { icon: 'Trophy' })}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Achievement
                </button>
              </div>

              <div className="space-y-4">
                {achievementsList.map(ach => (
                  <div key={ach.id} className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{ach.title}</h3>
                      <p className="text-xs font-mono text-slate-400">{ach.subtitle} ({ach.date})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('achievement', ach)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('achievement', ach.id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Social Links CRUD</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Manage GitHub, LinkedIn, Email, etc.</p>
                </div>
                <button
                  onClick={() => openCreateModal('social', { active: true })}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Social Link
                </button>
              </div>

              <div className="space-y-4">
                {socialLinksList.map(s => (
                  <div key={s.id} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">{s.platform}</h3>
                      <p className="text-xs font-mono text-slate-400">{s.url}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('social', s)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('social', s.id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-white">Contact Messages</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Stored securely in PostgreSQL.</p>
              </div>

              <div className="space-y-4">
                {messagesList.length === 0 ? (
                  <p className="text-xs font-mono text-slate-500 py-8 text-center">No contact messages received.</p>
                ) : (
                  messagesList.map(msg => (
                    <div key={msg.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white">{msg.name} ({msg.email})</h3>
                          <p className="text-xs font-mono text-brand-400">Subject: {msg.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500">{new Date(msg.createdAt).toLocaleString()}</span>
                          <button onClick={() => handleDelete('message', msg.id)} className="p-1.5 text-rose-400 hover:text-rose-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl font-mono whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>

        {/* UNIVERSAL CRUD MODAL DIALOG */}
        {modalType && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold font-display text-white capitalize">
                  {editingItem ? `Edit ${modalType}` : `Create New ${modalType}`}
                </h3>
                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>

              <form onSubmit={handleModalSave} className="space-y-4">
                {modalType === 'project' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">TITLE</label>
                        <input required type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">SLUG (URL)</label>
                        <input type="text" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" placeholder="smart-irrigation" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">CATEGORY</label>
                        <input type="text" value={formData.category || 'Full-Stack'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div className="flex items-center pt-6 gap-2">
                        <input type="checkbox" id="featured" checked={Boolean(formData.featured)} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 text-brand-600 rounded" />
                        <label htmlFor="featured" className="text-xs font-mono text-slate-300">FEATURED PROJECT</label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">IMAGE URL OR UPLOAD</label>
                      <div className="flex gap-2">
                        <input type="text" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" placeholder="https://..." />
                        <label className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 cursor-pointer flex items-center gap-1 hover:bg-slate-700">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">SHORT DESCRIPTION</label>
                      <textarea rows={2} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">TECHNOLOGIES (Comma Separated)</label>
                      <input type="text" value={formData.technologies || ''} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" placeholder="React, Node.js, Express, PostgreSQL" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">GITHUB URL</label>
                        <input type="text" value={formData.githubUrl || ''} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">LIVE DEMO URL</label>
                        <input type="text" value={formData.liveUrl || ''} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'skill' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">SKILL NAME</label>
                        <input required type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">CATEGORY</label>
                        <select value={formData.category || 'Programming'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white">
                          <option value="Programming">Programming</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="AI / ML">AI / ML</option>
                          <option value="Databases">Databases</option>
                          <option value="Tools">Tools</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">PROFICIENCY PERCENTAGE (1-100)</label>
                      <input type="number" min="1" max="100" value={formData.proficiency || 80} onChange={e => setFormData({ ...formData, proficiency: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>
                  </>
                )}

                {modalType === 'experience' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">ROLE</label>
                        <input required type="text" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">COMPANY</label>
                        <input required type="text" value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">START DATE</label>
                        <input type="text" value={formData.startDate || ''} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">END DATE</label>
                        <input type="text" value={formData.endDate || 'Present'} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                      <textarea rows={2} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">BULLET POINTS (One per line)</label>
                      <textarea rows={3} value={formData.bulletPoints || ''} onChange={e => setFormData({ ...formData, bulletPoints: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>
                  </>
                )}

                {modalType === 'education' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">DEGREE</label>
                        <input required type="text" value={formData.degree || ''} onChange={e => setFormData({ ...formData, degree: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">INSTITUTION</label>
                        <input required type="text" value={formData.institution || ''} onChange={e => setFormData({ ...formData, institution: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">START YEAR</label>
                        <input type="text" value={formData.startYear || ''} onChange={e => setFormData({ ...formData, startYear: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">END YEAR</label>
                        <input type="text" value={formData.endYear || ''} onChange={e => setFormData({ ...formData, endYear: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'achievement' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">ACHIEVEMENT TITLE</label>
                      <input required type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">SUBTITLE</label>
                      <input type="text" value={formData.subtitle || ''} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                      <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" />
                    </div>
                  </>
                )}

                {modalType === 'social' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">PLATFORM NAME</label>
                        <input required type="text" value={formData.platform || ''} onChange={e => setFormData({ ...formData, platform: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" placeholder="GitHub" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">URL</label>
                        <input required type="text" value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white" placeholder="https://..." />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-lg">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
