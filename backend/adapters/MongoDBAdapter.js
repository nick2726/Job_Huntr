const User = require('../models/User');

/**
 * MCP Adapter for MongoDB interactions like fetching users or bookmarks.
 */
class MongoDBAdapter {
  constructor() {}

  // Tool: Find users by role or email
  async findUsers(query) {
    try {
      const users = await User.find(query).select('-password');
      return users;
    } catch (error) {
      console.error('Error in findUsers adapter tool:', error);
      return [];
    }
  }

  // Tool: Save bookmark for a user directly
  async saveBookmark(userId, internshipId) {
    try {
      const user = await User.findById(userId);
      if (!user) return false;
      
      if (!user.savedInternships.includes(internshipId)) {
        user.savedInternships.push(internshipId);
        await user.save();
      }
      return true;
    } catch (error) {
      console.error('Error in saveBookmark adapter tool:', error);
      return false;
    }
  }
}

module.exports = new MongoDBAdapter();
