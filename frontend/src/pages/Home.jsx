import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, Search, ArrowRight, ShieldCheck, Zap, Globe, FileCheck, Building2, TrendingUp } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/internships');
    }
  };

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-center space-y-8 py-8 sm:py-12">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Hero Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>Next-Gen Job & Internship Aggregator</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Land Your Dream Internship with <span className="gradient-text">AI Precision</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Aggregating live tech opportunities across India & worldwide. Scan your resume against job requirements with built-in AI ATS scoring.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 px-3 w-full py-2 sm:py-0">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by role (e.g. React Developer, Data Science)..."
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick CTA Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
          <span>Popular:</span>
          <Link to="/internships?location=Karnataka" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">Karnataka</Link>
          <span>•</span>
          <Link to="/internships?mode=Remote" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">Remote</Link>
          <span>•</span>
          <Link to="/ats-scanner" className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try ATS Resume Scanner</span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 text-center space-y-1 card-hover">
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">150+</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Verified Indian Jobs</div>
        </div>
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 text-center space-y-1 card-hover">
          <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">20+</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Top Tech Companies</div>
        </div>
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 text-center space-y-1 card-hover">
          <div className="text-3xl sm:text-4xl font-extrabold text-pink-600 dark:text-pink-400">98%</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">AI ATS Match Accuracy</div>
        </div>
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 text-center space-y-1 card-hover">
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Free Candidate Access</div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Built for candidates, students, and recruiters seeking high-performance career matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4 card-hover">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI ATS Resume Scanner</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Upload your PDF resume or paste raw text to receive real-time compatibility scores, skill gap breakdown, and actionable optimization tips.
            </p>
            <Link to="/ats-scanner" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              <span>Scan Resume Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4 card-hover">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Multi-Source Job Aggregator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Live automated scrapers querying RemoteOK, Arbeitnow, and Google Jobs (SerpApi) to deliver fresh internship opportunities daily.
            </p>
            <Link to="/internships" className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              <span>Browse All Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4 card-hover">
            <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Career Assistant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Interactive 24/7 AI Chatbot powered by LangChain and OpenAI to answer questions, recommend jobs, and help prepare for technical interviews.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400">
              <span>Available in bottom right widget</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
