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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!company) return <div className="text-center py-10">Company not found.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100">
            {company.logo && company.logo !== 'no-logo.png' ? (
              <img src={company.logo} alt={company.companyName} className="w-full h-full object-contain" />
            ) : (
              <Building className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.companyName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {company.location}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium uppercase tracking-wide">
                {company.industry}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {company.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Internships at {company.companyName}</h2>
        {/* We would fetch the internships for this company here, or pass a filter to the internships component. 
            For now, we leave a placeholder. */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          No open internships at the moment.
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
