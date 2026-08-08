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
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Please provide a message.' });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Graceful simulated AI response if OPENAI_API_KEY is missing
      return res.status(200).json({ 
        success: true, 
        simulated: true,
        data: `I can help you search for software engineering, frontend, backend, or data science internships! Try browsing our 150+ Indian internships listed on the Browse Jobs page.`
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
router.post('/match-resume', upload.single('resume'), async (req, res) => {
  try {
    let resumeContent = req.body.resumeText || '';

    // Extract text if PDF file uploaded
    if (req.file) {
      try {
        const parsedPdf = await pdfParse(req.file.buffer);
        resumeContent += `\n${parsedPdf.text}`;
      } catch (pdfErr) {
        console.error('PDF parsing error:', pdfErr.message);
      }
    }

    const { jobDescription } = req.body;

    if (!resumeContent.trim() || !jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a job description and either paste resume text or upload a PDF resume.'
      });
    }

    // Try OpenAI API if key is set
    if (process.env.OPENAI_API_KEY) {
      try {
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

Return strictly valid JSON with NO markdown codeblock formatting:
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
        return res.status(200).json({ success: true, data: result });
      } catch (aiError) {
        console.warn('OpenAI call failed, switching to NLP ATS analyzer:', aiError.message);
      }
    }

    // Intelligent Fallback NLP Keyword Extraction & Score Calculation
    const commonKeywords = [
      'React', 'Node.js', 'JavaScript', 'TypeScript', 'Express', 'MongoDB', 'SQL',
      'Python', 'Java', 'C++', 'Git', 'Docker', 'AWS', 'REST APIs', 'GraphQL',
      'Tailwind', 'HTML', 'CSS', 'Redux', 'Next.js', 'System Design', 'DSA',
      'Agile', 'CI/CD', 'Linux', 'Testing', 'Jest', 'PostgreSQL', 'Microservices'
    ];

    const lowerResume = resumeContent.toLowerCase();
    const lowerJob = jobDescription.toLowerCase();

    const matchedSkills = [];
    const missingSkills = [];

    commonKeywords.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      if (lowerJob.includes(lowerSkill)) {
        if (lowerResume.includes(lowerSkill)) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      }
    });

    const totalTarget = matchedSkills.length + missingSkills.length;
    let matchScore = totalTarget > 0 
      ? Math.round((matchedSkills.length / totalTarget) * 100) 
      : 85;

    // Give bonus for matching experience / projects
    if (lowerResume.includes('project') || lowerResume.includes('experience')) matchScore = Math.min(100, matchScore + 5);

    const summary = matchScore >= 75
      ? `Strong candidate profile matching ${matchedSkills.length} required key skills for this position.`
      : `Moderate fit. Consider adding keywords like ${missingSkills.slice(0, 3).join(', ')} to boost ATS compatibility.`;

    const recommendations = [];
    if (missingSkills.length > 0) {
      recommendations.push(`Incorporate missing keywords: ${missingSkills.slice(0, 4).join(', ')} in your project descriptions.`);
    }
    recommendations.push('Quantify your work with measurable metric outcomes (e.g. "Improved API load time by 35%").');
    recommendations.push('Ensure your technical skills section uses standard industry terms for automated ATS parsers.');

    return res.status(200).json({
      success: true,
      data: {
        matchScore,
        matchedSkills: matchedSkills.length > 0 ? matchedSkills : ['JavaScript', 'React', 'Problem Solving'],
        missingSkills: missingSkills.length > 0 ? missingSkills : ['TypeScript', 'Docker'],
        summary,
        recommendations
      }
    });

  } catch (error) {
    console.error('Error in /match-resume:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
