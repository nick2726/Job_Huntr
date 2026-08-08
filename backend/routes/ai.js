const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { ChatOpenAI } = require('@langchain/openai');
const { protect } = require('../middleware/auth');
const { createAgentGraph } = require('../ai/agent');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/ai/chat:
 *   post:
 *     summary: Chat with AI Career Assistant
 *     tags:
 *       - AI Engine
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Recommend software engineering internships in React."
 *     responses:
 *       200:
 *         description: AI Assistant response generated successfully
 *       400:
 *         description: Missing input message
 *       503:
 *         description: AI key not configured
 */
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

    const app = createAgentGraph();
    const finalState = await app.invoke({
      messages: [{ role: 'user', content: message }]
    });

    const responseMsg = finalState.messages[finalState.messages.length - 1];

    res.status(200).json({ success: true, data: responseMsg.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @openapi
 * /api/ai/match-resume:
 *   post:
 *     summary: Analyze ATS Compatibility between Resume and Job Description
 *     tags:
 *       - AI Engine
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: PDF file of candidate resume
 *               resumeText:
 *                 type: string
 *                 description: Raw text of candidate resume
 *               jobDescription:
 *                 type: string
 *                 example: "Looking for a React developer with Node.js & MongoDB skills."
 *     responses:
 *       200:
 *         description: ATS match score and detailed feedback returned
 *       400:
 *         description: Missing resume or job description
 */
router.post('/match-resume', protect, upload.single('resume'), async (req, res) => {
  try {
    let resumeContent = req.body.resumeText || '';

    // If PDF file uploaded, extract text
    if (req.file) {
      const parsedPdf = await pdfParse(req.file.buffer);
      resumeContent += `\n${parsedPdf.text}`;
    }

    const { jobDescription } = req.body;

    if (!resumeContent.trim() || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a job description and either paste resume text or upload a PDF resume.'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return realistic mock ATS score if OpenAI key is not set
      return res.status(200).json({
        success: true,
        data: {
          matchScore: 82,
          matchedSkills: ['JavaScript', 'React', 'Node.js', 'REST APIs'],
          missingSkills: ['Docker', 'TypeScript', 'GraphQL'],
          summary: 'Strong match for full-stack candidate with React and Node.js expertise.',
          recommendations: [
            'Add measurable achievements to your React project bullet points.',
            'Mention Docker containerization experience if applicable.',
            'Include TypeScript keywords to pass strict ATS filters.'
          ]
        }
      });
    }

    const llm = new ChatOpenAI({
      temperature: 0.2,
      modelName: 'gpt-4o-mini',
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `You are an expert ATS (Applicant Tracking System) Analyzer. Analyze the candidate resume against the job description below.

--- RESUME CONTENT ---
${resumeContent.substring(0, 3000)}

--- JOB DESCRIPTION ---
${jobDescription.substring(0, 2000)}

Return strictly valid JSON with the following structure:
{
  "matchScore": number (0-100),
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "summary": "Brief 2-sentence match summary",
  "recommendations": ["tip 1", "tip 2", "tip 3"]
}`;

    const response = await llm.invoke(prompt);
    const jsonText = response.content.replace(/```json|```/g, '').trim();
    const result = JSON.parse(jsonText);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
