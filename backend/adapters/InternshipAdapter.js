const Internship = require('../models/Internship');
const Company = require('../models/Company');

/**
 * MCP Adapter for Internships.
 * This adapter exposes tools for the LangGraph AI Assistant to interact with the database.
 */
class InternshipAdapter {
  constructor() {}

  // Tool: Search for internships
  async searchInternships(query) {
    try {
      // Very basic keyword matching just for the adapter example
      const keywords = query.keyword ? query.keyword : '';
      let filter = {};
      
      if (keywords) {
        filter = {
          $or: [
            { title: { $regex: keywords, $options: 'i' } },
            { description: { $regex: keywords, $options: 'i' } }
          ]
        };
      }
      
      const internships = await Internship.find(filter).populate('companyId', 'companyName location');
      return internships;
    } catch (error) {
      console.error('Error in searchInternships adapter tool:', error);
      return [];
    }
  }

  // Tool: Get specific internship details
  async getInternship(id) {
    try {
      const internship = await Internship.findById(id).populate('companyId');
      return internship;
    } catch (error) {
      console.error('Error in getInternship adapter tool:', error);
      return null;
    }
  }
}

module.exports = new InternshipAdapter();
