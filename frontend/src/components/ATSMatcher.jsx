import React, { useState } from 'react';
import api from '../services/api';
import { Upload, CheckCircle2, XCircle, Sparkles, FileText, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function ATSMatcher() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFillSample = () => {
    setResumeText(
      `Alex Mercer
Software Engineering Candidate | Bengaluru, India
Email: alex@example.com | Portfolio: github.com/alexmercer

SKILLS:
- Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS, Redux
- Backend: Node.js, Express, REST APIs, MongoDB, SQL
- Tools: Git, GitHub, VS Code, Postman, Vite

EXPERIENCE & PROJECTS:
- Full-Stack Developer Intern at TechCorp (6 Months): Built responsive React UI components and integrated Express REST API endpoints with MongoDB.
- JobHuntr Aggregator Project: Developed an automated job scraping portal with AI ATS scoring using LangChain and Node.js.`
    );

    setJobDescription(
      `Full-Stack Software Engineering Intern
Location: Remote / Bengaluru

Requirements:
- Strong proficiency in React, JavaScript (ES6+), and modern CSS frameworks like Tailwind CSS.
- Hands-on experience with Node.js, Express framework, and MongoDB or SQL databases.
- Familiarity with RESTful APIs, Git version control, and TypeScript.
- Knowledge of Docker, CI/CD pipelines, and AWS is a plus.
- Pursuing B.Tech / B.E in Computer Science or related fields.`
    );
    setError('');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!resumeText.trim() && !file) {
      setError('Please upload a PDF resume or paste your resume text.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste the target job description.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('resume', file);
      }
      formData.append('resumeText', resumeText);
      formData.append('jobDescription', jobDescription);

      const res = await api.post('/ai/match-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setError(res.data.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze ATS match score. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500 stroke-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800';
    if (score >= 60) return 'text-amber-500 stroke-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800';
    return 'text-rose-500 stroke-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-4 h-4" />
          AI-Powered ATS Resume Scanner
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Optimize Your Resume for ATS Scanners
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Compare your resume against any job description. Get instant match scores, missing skill gaps, and AI feedback to get hired faster.
        </p>

        {/* Quick Sample Button */}
        <div>
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Autofill Sample Resume & Job Description</span>
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Upload / Text Area */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Candidate Resume
            </label>
            
            {/* File Upload Dropzone */}
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-indigo-500 transition-colors bg-gray-50/50 dark:bg-gray-900/50">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-file"
              />
              <label htmlFor="resume-file" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 text-indigo-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {file ? file.name : 'Upload PDF Resume (Optional)'}
                </span>
                <span className="text-xs text-gray-400">Click to browse file</span>
              </label>
            </div>

            <div className="text-center text-xs text-gray-400 font-medium uppercase tracking-wider">or paste resume text</div>

            <textarea
              rows={7}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste raw text from your resume..."
              className="w-full p-3.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Job Description */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Job / Internship Description
            </label>
            <textarea
              rows={12}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description or requirements here..."
              className="w-full p-3.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing ATS Compatibility...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze ATS Match Score</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* Analysis Results Card */}
      {result && (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                ATS Compatibility Report
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {result.summary}
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${getScoreColor(result.matchScore)}`}>
              <div className="text-3xl font-extrabold">{result.matchScore}%</div>
              <div className="text-xs font-semibold uppercase tracking-wider">
                ATS Match<br />Score
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>Matched Skills ({result.matchedSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-200 text-xs font-medium rounded-full shadow-xs border border-emerald-200 dark:border-emerald-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
                <XCircle className="w-5 h-5" />
                <span>Missing Skill Gaps ({result.missingSkills?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white dark:bg-rose-900/60 text-rose-700 dark:text-rose-200 text-xs font-medium rounded-full shadow-xs border border-rose-200 dark:border-rose-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Actionable Recommendations to Improve Score
            </h3>
            <ul className="space-y-2">
              {result.recommendations?.map((rec, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
