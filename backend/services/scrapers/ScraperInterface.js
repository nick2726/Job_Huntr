/**
 * Base Interface for all Job Scrapers.
 * Enforces a standard output format so the Aggregator can easily ingest data
 * from any source (LinkedIn, Indeed, RemoteOK, etc.) without caring about the specifics.
 */
class ScraperInterface {
  constructor(name) {
    this.name = name;
  }

  /**
   * Fetch jobs from the external source based on filters.
   * @param {Object} filters - Search filters (e.g., { role: 'Frontend', location: 'India' })
   * @returns {Promise<Array>} Array of normalized job objects.
   * 
   * Normalized Job Object Format:
   * {
   *   title: String,
   *   companyName: String,
   *   companyLogo: String,
   *   location: String,
   *   description: String,
   *   skills: Array<String>,
   *   applyLink: String
   * }
   */
  async fetchJobs(filters) {
    throw new Error('fetchJobs() must be implemented by the subclass');
  }
}

module.exports = ScraperInterface;
