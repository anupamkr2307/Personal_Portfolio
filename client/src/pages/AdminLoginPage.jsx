import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('anupamkr2307@gmail.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Admin authentication successful! Welcome Anupam.', 'success');
      navigate('/admin');
    } catch (err) {
      showToast(err.message || 'Invalid admin credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Anupam Portfolio</title>
      </Helmet>

      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-brand-500/30 selection:text-brand-400">
        {/* Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 p-0.5 mx-auto shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Enter admin JWT credentials to manage portfolio content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
                ADMIN EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] font-mono text-slate-500">
              Default Seed Email: <span className="text-brand-400">anupamkr2307@gmail.com</span>
              <br />
              Default Seed Password: <span className="text-brand-400">AdminPassword123!</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
