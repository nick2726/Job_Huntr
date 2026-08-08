import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { User, FileText, Upload } from 'lucide-react';

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
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!profile) return <div className="text-center py-10">Please log in.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500">{profile.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wide">
            {profile.role}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-gray-500" />
          Resume
        </h2>
        
        {profile.resumeUrl ? (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Resume: {profile.resumeUrl.split('/').pop()}</span>
            <a href={`http://localhost:5000${profile.resumeUrl}`} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm font-medium hover:underline">
              View PDF
            </a>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-sm">
            No resume uploaded yet.
          </div>
        )}

        <form onSubmit={handleUpload} className="flex flex-col gap-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Resume (PDF, DOCX)</label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <button 
            type="submit" 
            disabled={!file || uploading}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
          {message && <p className="text-sm font-medium text-gray-900 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
