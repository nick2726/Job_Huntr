const Company = require('../models/Company');
const Internship = require('../models/Internship');

// Import Scrapers
const RemoteOkScraper = require('./scrapers/RemoteOkScraper');
const ArbeitnowScraper = require('./scrapers/ArbeitnowScraper');
const SerpApiScraper = require('./scrapers/SerpApiScraper');

class JobAggregator {
  constructor() {
    // Register all active scrapers
    this.scrapers = [
      new RemoteOkScraper(),
      new ArbeitnowScraper(),
      new SerpApiScraper()
    ];
  }

  /**
   * Fetch jobs from all registered scrapers and save them to the DB.
   * @param {Object} filters - Search filters (e.g., { role: 'Frontend', location: 'India' })
   */
  async aggregateAndStore(filters = {}) {
    try {
      console.log(`Starting Aggregation with filters:`, filters);
      let totalInserted = 0;

      for (const scraper of this.scrapers) {
        const jobs = await scraper.fetchJobs(filters);
        
        for (const job of jobs) {
          // 1. Check or Create Company
          let company = await Company.findOne({ companyName: job.companyName });
          if (!company) {
            company = await Company.create({
              companyName: job.companyName,
              logo: job.companyLogo || 'no-logo.png',
              location: job.location || 'Unknown',
              description: `A company hiring from ${scraper.name}.`,
              industry: 'Various'
            });
          }

          // 2. Check if Internship/Job already exists
          const existingJob = await Internship.findOne({
            title: job.title,
            companyId: company._id
          });

          if (!existingJob) {
            // 3. Insert Job
            await Internship.create({
              title: job.title,
              companyId: company._id,
              source: scraper.name,
              description: job.description || 'No description provided.',
              responsibilities: 'Responsibilities outlined in apply link.',
              requirements: 'Requirements outlined in apply link.',
              benefits: 'Competitive.',
              skills: job.skills || [],
              location: job.location || 'Unknown',
              stipend: 'Competitive',
              duration: 'Full-time',
              mode: job.location === 'Remote' ? 'Remote' : 'On-site',
              experienceLevel: 'Entry/Intern',
              applyLink: job.applyLink,
              deadline: new Date(new Date().setMonth(new Date().getMonth() + 1))
            });
            totalInserted++;
          }
        }
      }

      console.log(`Aggregation Complete! Successfully inserted ${totalInserted} new jobs from all sources.`);
      return totalInserted;
    } catch (error) {
      console.error('Error during global Job Aggregation:', error.message);
      throw error;
    }
  }
}

module.exports = new JobAggregator();
