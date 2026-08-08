const ScraperInterface = require('./ScraperInterface');

class LinkedInScraper extends ScraperInterface {
  constructor() {
    super('LinkedIn (Mocked)');
    // In reality, you would inject a RapidAPI Key or SerpApi Key here.
    // this.apiKey = process.env.LINKEDIN_RAPIDAPI_KEY;
  }

  async fetchJobs(filters = {}) {
    console.log(`[${this.name}] Fetching jobs using third-party API...`);
    
    // Simulate a network request to a paid LinkedIn Job API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mocked data that fits the normalized format
    const mockJobs = [
      {
        title: 'Software Engineer Intern',
        companyName: 'Microsoft',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        location: filters.location || 'Redmond, WA',
        description: 'Join Microsoft as a Software Engineering Intern and help build the future of computing.',
        skills: ['C++', 'C#', 'Azure'],
        applyLink: 'https://careers.microsoft.com'
      },
      {
        title: 'Frontend Intern',
        companyName: 'LinkedIn',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
        location: filters.location || 'Sunnyvale, CA',
        description: 'Help build user interfaces for millions of professionals.',
        skills: ['React', 'Ember.js', 'JavaScript'],
        applyLink: 'https://careers.linkedin.com'
      }
    ];

    // Basic Filtering Implementation on Mocked Data
    const normalizedJobs = mockJobs.filter(job => {
      if (filters.role && !job.title.toLowerCase().includes(filters.role.toLowerCase())) return false;
      return true;
    });

    console.log(`[${this.name}] Found ${normalizedJobs.length} matching jobs.`);
    return normalizedJobs;
  }
}

module.exports = LinkedInScraper;
