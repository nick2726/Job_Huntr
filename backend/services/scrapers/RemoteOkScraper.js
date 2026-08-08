const axios = require('axios');
const ScraperInterface = require('./ScraperInterface');

class RemoteOkScraper extends ScraperInterface {
  constructor() {
    super('RemoteOK');
    this.apiUrl = 'https://remoteok.com/api';
  }

  async fetchJobs(filters = {}) {
    try {
      console.log(`[${this.name}] Fetching jobs...`);
      const response = await axios.get(this.apiUrl);
      const rawJobs = response.data;
      
      const normalizedJobs = [];

      for (const job of rawJobs) {
        if (!job.company) continue; // Skip legal disclaimer

        // Basic Filtering Implementation
        if (filters.role && !job.position.toLowerCase().includes(filters.role.toLowerCase())) {
          continue;
        }

        normalizedJobs.push({
          title: job.position,
          companyName: job.company,
          companyLogo: job.company_logo || 'no-logo.png',
          location: job.location || 'Remote',
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

module.exports = RemoteOkScraper;
