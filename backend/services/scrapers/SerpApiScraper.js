const axios = require('axios');
const ScraperInterface = require('./ScraperInterface');

class SerpApiScraper extends ScraperInterface {
  constructor() {
    super('SerpApi (Google Jobs)');
    this.apiUrl = 'https://serpapi.com/search.json';
    this.apiKey = process.env.SERPAPI_KEY;
  }

  async fetchJobs(filters = {}) {
    if (!this.apiKey) {
      console.warn(`[${this.name}] SERPAPI_KEY is missing from .env. Skipping SerpApi job fetch.`);
      return [];
    }

    try {
      console.log(`[${this.name}] Fetching real jobs from Google Jobs via SerpApi...`);
      
      // Build search query based on filters
      // e.g. "software engineer internship in India"
      const role = filters.role || 'software engineer internship';
      const location = filters.location || 'India';
      const q = `${role} in ${location}`;

      const response = await axios.get(this.apiUrl, {
        params: {
          engine: 'google_jobs',
          q: q,
          hl: 'en',
          api_key: this.apiKey
        }
      });

      const rawJobs = response.data.jobs_results || [];
      const normalizedJobs = [];

      for (const job of rawJobs) {
        if (!job.company_name) continue;

        // Parse skills from highlights or description if available
        let skills = [];
        if (job.job_highlights) {
          job.job_highlights.forEach(highlight => {
            if (highlight.title && highlight.title.toLowerCase().includes('qualifications')) {
              skills.push(...(highlight.items || []));
            }
          });
        }

        normalizedJobs.push({
          title: job.title,
          companyName: job.company_name,
          companyLogo: job.thumbnail || 'no-logo.png',
          location: job.location || location,
          description: job.description || 'No description provided.',
          skills: skills.slice(0, 5), // Keep it concise
          applyLink: job.related_links?.[0]?.link || 'https://google.com/search?q=' + encodeURIComponent(job.title + ' ' + job.company_name)
        });
      }

      console.log(`[${this.name}] Found ${normalizedJobs.length} matching jobs from India.`);
      return normalizedJobs;
    } catch (error) {
      console.error(`[${this.name}] Error fetching jobs:`, error.message);
      return [];
    }
  }
}

module.exports = SerpApiScraper;
