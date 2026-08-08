import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, KeyRound, Mail, Sparkles, UserCheck } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillDemoStudent = () => {
    setFormData({ email: 'student@jobhuntr.dev', password: 'password123' });
  };

  const fillDemoRecruiter = () => {
    setFormData({ email: 'recruiter@jobhuntr.dev', password: 'password123' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        navigate('/internships');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shadow-sm">
            <Briefcase className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Sign in to JobHuntr
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Access AI resume matching, application tracking, and live job feeds
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
          
          {/* Quick Demo Credentials Auto-Fill */}
          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <div className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Quick Recruiter / Student Demo Login</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={fillDemoStudent}
                className="flex-1 py-1.5 px-3 bg-white dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={fillDemoRecruiter}
                className="flex-1 py-1.5 px-3 bg-white dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter Demo</span>
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/50 rounded-xl border border-rose-200 dark:border-rose-900 text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all cursor-pointer"
            >
              Sign in
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
