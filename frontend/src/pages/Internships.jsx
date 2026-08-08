import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building, Filter } from 'lucide-react';
import api from '../services/api';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [filters, setFilters] = useState({
    location: '',
    mode: '',
    companyType: ''
  });

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const trackView = (job) => {
    let viewed = [...recentlyViewed];
    // Remove if exists to push to front
    viewed = viewed.filter(j => j._id !== job._id);
    viewed.unshift(job);
    if (viewed.length > 5) viewed = viewed.slice(0, 5);
    setRecentlyViewed(viewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
  };

  const fetchInternships = async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.mode) params.append('mode', filters.mode);
      if (filters.companyType) params.append('companyType', filters.companyType);

      const res = await api.get(`/internships?${params.toString()}`);
      setInternships(res.data.data);
    } catch (err) {
      setError('Failed to fetch internships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
    // eslint-disable-next-line
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
          </div>

          <div className="space-y-6">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location (State)</label>
              <select 
                name="location" 
                value={filters.location} 
                onChange={handleFilterChange}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
              >
                <option value="">All Locations</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Telangana">Telangana</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* Work Mode Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Mode</label>
              <select 
                name="mode" 
                value={filters.mode} 
                onChange={handleFilterChange}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
              >
                <option value="">Any Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Company Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Type</label>
              <select 
                name="companyType" 
                value={filters.companyType} 
                onChange={handleFilterChange}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
              >
                <option value="">All Types</option>
                <option value="Product Based">Product Based</option>
                <option value="Service Based">Service Based</option>
              </select>
            </div>
            
            <button 
              onClick={() => setFilters({location: '', mode: '', companyType: ''})}
              className="w-full text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-center"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Recently Viewed
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
              {recentlyViewed.map((job) => (
                <div key={`recent-${job._id}`} className="min-w-[280px] snap-start bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-gray-700 flex-shrink-0 cursor-pointer" onClick={() => window.open(job.applyLink, '_blank')}>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{job.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{job.companyId?.companyName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Available Internships</h1>
        
        {loading ? (
          <div className="text-center py-10 dark:text-white">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : internships.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            No internships found matching your filters.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {internships.map((job) => (
              <div key={job._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {job.companyId?.logo && job.companyId.logo !== 'no-logo.png' ? (
                        <img src={job.companyId.logo} alt={job.companyId.companyName} className="w-8 h-8 object-contain" />
                      ) : (
                        <Building className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.companyId?.companyName} • <span className="text-xs uppercase tracking-wide">{job.companyId?.companyType}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.mode === 'Remote' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {job.mode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Source: {job.source || 'Manual'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    {job.stipend}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {job.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium">
                      +{job.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <a href={job.applyLink} target="_blank" rel="noreferrer" onClick={() => trackView(job)} className="flex-1 bg-indigo-600 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center">
                    Apply / View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
