const express = require('express');
const { protect } = require('../middleware/auth');
const { createAgentGraph } = require('../ai/agent');

const router = express.Router();

// @desc    Ask the AI Assistant
// @route   POST /api/ai/chat
// @access  Private
router.post('/chat', protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Please provide a message.' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        success: false, 
        error: 'AI is not configured (Missing OPENAI_API_KEY).'
      });
    }

    // Compile graph and run
    const app = createAgentGraph();
    
    // Pass user context if needed (e.g. for bookmarking tool)
    // The message is passed into the state graph
    const finalState = await app.invoke({
      messages: [{ role: 'user', content: message }]
    });

    const responseMsg = finalState.messages[finalState.messages.length - 1];

    res.status(200).json({ success: true, data: responseMsg.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
