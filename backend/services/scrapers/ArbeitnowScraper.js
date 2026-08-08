const axios = require('axios');
const ScraperInterface = require('./ScraperInterface');

class ArbeitnowScraper extends ScraperInterface {
  constructor() {
    super('Arbeitnow');
    this.apiUrl = 'https://www.arbeitnow.com/api/job-board-api';
  }

  async fetchJobs(filters = {}) {
    try {
      console.log(`[${this.name}] Fetching real jobs from Arbeitnow API...`);
      const response = await axios.get(this.apiUrl);
      const rawJobs = response.data.data; // Arbeitnow returns jobs inside a 'data' array
      
      const normalizedJobs = [];

      for (const job of rawJobs) {
        if (!job.company_name) continue;

        // Basic Filtering Implementation
        if (filters.role && !job.title.toLowerCase().includes(filters.role.toLowerCase())) {
          continue;
        }

        // Arbeitnow remote mapping
        const isRemote = job.remote;
        if (filters.mode) {
          if (filters.mode === 'Remote' && !isRemote) continue;
          if (filters.mode === 'On-site' && isRemote) continue;
        }

        if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          continue;
        }

        normalizedJobs.push({
          title: job.title,
          companyName: job.company_name,
          companyLogo: 'no-logo.png', // Arbeitnow API doesn't guarantee a logo field reliably
          location: job.location || (isRemote ? 'Remote' : 'Unknown'),
          description: job.description || 'No description provided.',
          skills: job.tags || [],
          applyLink: job.url
        });
      }

      console.log(`[${this.name}] Found ${normalizedJobs.length} matching jobs.`);
      return normalizedJobs;
    } catch (error) {
      console.error(`[${this.name}] Error fetching jobs:`, error.message);
      return [];
    }
  }
}

module.exports = ArbeitnowScraper;
