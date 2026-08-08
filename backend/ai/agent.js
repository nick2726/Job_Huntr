const { ChatOpenAI } = require('@langchain/openai');
const { DynamicStructuredTool } = require('@langchain/core/tools');
const { createReactAgent } = require('@langchain/langgraph/prebuilt');
const { z } = require('zod');

// Import MCP Adapters
const internshipAdapter = require('../adapters/InternshipAdapter');
const mongoDBAdapter = require('../adapters/MongoDBAdapter');

// 1. Define Tools based on MCP Adapters
const searchInternshipsTool = new DynamicStructuredTool({
  name: 'search_internships',
  description: 'Search for internships based on keywords like title, skills, or description.',
  schema: z.object({
    keyword: z.string().describe('The keyword to search for internships'),
  }),
  func: async ({ keyword }) => {
    const results = await internshipAdapter.searchInternships({ keyword });
    return JSON.stringify(results);
  },
});

const saveBookmarkTool = new DynamicStructuredTool({
  name: 'save_bookmark',
  description: 'Save a specific internship bookmark for a user.',
  schema: z.object({
    userId: z.string().describe('The ID of the user'),
    internshipId: z.string().describe('The ID of the internship to bookmark'),
  }),
  func: async ({ userId, internshipId }) => {
    const success = await mongoDBAdapter.saveBookmark(userId, internshipId);
    return success ? 'Bookmark saved successfully.' : 'Failed to save bookmark.';
  },
});

const tools = [searchInternshipsTool, saveBookmarkTool];

const createAgentGraph = () => {
  const model = new ChatOpenAI({ 
    temperature: 0, 
    modelName: 'gpt-4o-mini',
    openAIApiKey: process.env.OPENAI_API_KEY 
  });
  
  return createReactAgent({ llm: model, tools });
};

module.exports = { createAgentGraph };
