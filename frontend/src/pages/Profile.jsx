import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { User, FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setProfile(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    setMessage('');

    try {
      const res = await api.post('/users/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(res.data.data);
      setMessage('Resume uploaded successfully!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error uploading resume');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center py-12 dark:text-white">Loading profile...</div>;
  if (!profile) return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Please log in to view your profile.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Info Header */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/60 rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-800 flex-shrink-0">
          <User className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800 uppercase tracking-wide">
              Role: {profile.role}
            </span>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-500" />
          <span>Resume & Documents</span>
        </h2>
        
        {profile.resumeUrl ? (
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-emerald-900 dark:text-emerald-300 truncate">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="truncate font-medium">Uploaded: {profile.resumeUrl.split('/').pop()}</span>
            </div>
            <a
              href={`http://localhost:5000${profile.resumeUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex-shrink-0"
            >
              View PDF
            </a>
          </div>
        ) : (
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-xl border border-amber-200 dark:border-amber-900/50 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span>No resume uploaded yet. Upload your PDF resume below.</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upload New Resume (PDF, DOCX)
            </label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950/60 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50 cursor-pointer"
            />
          </div>
          <button 
            type="submit" 
            disabled={!file || uploading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Resume'}</span>
          </button>
          {message && (
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
