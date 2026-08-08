import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Building, MapPin, Globe } from 'lucide-react';
import api from '../services/api';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/companies/${id}`);
        setCompany(res.data.data);
      } catch (err) {
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) return <div className="text-center py-12 dark:text-white">Loading company details...</div>;
  if (error) return <div className="text-center py-12 text-rose-500">{error}</div>;
  if (!company) return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Company not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center p-3 border border-gray-100 dark:border-gray-700 flex-shrink-0">
            {company.logo && company.logo !== 'no-logo.png' ? (
              <img src={company.logo} alt={company.companyName} className="w-full h-full object-contain" />
            ) : (
              <Building className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{company.companyName}</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-500" /> {company.location}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline">
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
              <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-semibold uppercase tracking-wide">
                {company.industry || 'Technology'}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {company.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Open Positions at {company.companyName}</h2>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          Check the Browse Jobs page for active listings from {company.companyName}.
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
