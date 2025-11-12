// const { Configuration, OpenAIApi } = require("openai"); // OpenAI
// const { GoogleGenerativeAI } = require("@google/generative-ai"); // Gemini
// const fs = require("fs");
// const PDFParser = require("pdf2json");

// const genAI1 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1);
// const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
// const genAI3 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY3);
// // const openAI = new OpenAIApi(
// //   new Configuration({ apiKey: process.env.OPENAI_API_KEY })
// // );

// // ========== Extract PDF Text ==========
// const extractResumeText = async (filePath) => {
//   const pdfBuffer = fs.readFileSync(filePath);
//   return new Promise((resolve, reject) => {
//     const pdfParser = new PDFParser();
//     pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
//     pdfParser.on("pdfParser_dataReady", (pdfData) => {
//       let text = "";
//       pdfData.Pages.forEach((page) =>
//         page.Texts.forEach((t) =>
//           t.R.forEach((r) => (text += decodeURIComponent(r.T) + " "))
//         )
//       );
//       resolve(text.trim());
//     });
//     pdfParser.parseBuffer(pdfBuffer);
//   });
// };

// // ========== Resume Scoring (OpenAI) ==========
// const scoreResume = async (resumeText, jobDescription) => {
//   try {
//     const prompt = `
//       You are an expert recruiter. Score this resume against the job description.
//       Respond strictly as JSON:
//       {
//         "skills_found": [...],
//         "missing_skills": [...],
//         "scores": {
//           "Experience": 1-10,
//           "Skills": 1-10,
//           "Projects": 1-10,
//           "Education": 1-10
//         },
//         "summary": "short evaluation"
//       }
//       Job Description: ${jobDescription}
//       Resume Text: ${resumeText}
//     `;

//     const response = await openAI.createChatCompletion({
//       model: "gpt-4",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0,
//     });

//     const text = response.data.choices[0].message.content;
//     return JSON.parse(text.replace(/```json|```/g, "").trim());
//   } catch (err) {
//     console.error("AI JSON parse error (Resume Scoring):", err);
//     return {
//       scores: {},
//       summary: "AI failed",
//       skills_found: [],
//       missing_skills: [],
//     };
//   }
// };

// // ========== Resume-Based Questions (Gemini) ==========
// const generateQuestions = async (resumeText, jobRole) => {
//   try {
//     const prompt = `
//       You are an experienced interviewer. Generate 3-5 short technical questions
//       based on candidate resume and job role.
//       Respond strictly as JSON: { "job_role": "${jobRole}", "questions": ["Q1","Q2","Q3"] }
//       Resume Text: ${resumeText}
//     `;
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     return JSON.parse(text.replace(/```json|```/g, "").trim()).questions || [];
//   } catch (err) {
//     console.error("AI JSON parse error (Resume Questions):", err);
//     return [];
//   }
// };

// // ========== Overall Evaluation (Third LLM) ==========
// const overallEvaluation = async (scoreData, questionsData) => {
//   try {
//     const prompt = `
//       Senior evaluator: Based on resume scores and questions, provide evaluation.
//       Respond as JSON:
//       { "overall_rating": "Excellent/Good/Average/Poor",
//         "feedback": "one paragraph feedback",
//         "recommendation": "Hire/Consider/Reject"
//       }
//       Resume Scoring: ${JSON.stringify(scoreData)}
//       Questions: ${JSON.stringify(questionsData)}
//     `;
//     // Placeholder for third LLM API call
//     // Use OpenAI or any other LLM
//     const response = await openAI.createChatCompletion({
//       model: "gpt-4",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0,
//     });

//     const text = response.data.choices[0].message.content;
//     return JSON.parse(text.replace(/```json|```/g, "").trim());
//   } catch (err) {
//     console.error("AI JSON parse error (Overall Eval):", err);
//     return {
//       overall_rating: "Average",
//       feedback: "Evaluation failed",
//       recommendation: "Consider",
//     };
//   }
// };

// // ========== Main Processor ==========
// const processResume = async (resumeFilePath, jobDescription, jobRole) => {
//   try {
//     const resumeText = await extractResumeText(resumeFilePath);

//     // Parallel AI tasks
//     const [scoreData, questionsData] = await Promise.all([
//       scoreResume(resumeText, jobDescription),
//       generateQuestions(resumeText, jobRole),
//     ]);

//     const finalEval = await overallEvaluation(scoreData, questionsData);

//     // Delete resume after processing
//     if (fs.existsSync(resumeFilePath)) fs.unlinkSync(resumeFilePath);

//     return {
//       resume_summary: scoreData.summary,
//       resume_scores: scoreData.scores,
//       resumeBasedQuestions: questionsData,
//       final_evaluation: finalEval,
//     };
//   } catch (err) {
//     console.error("AI processing error:", err);
//     if (fs.existsSync(resumeFilePath)) fs.unlinkSync(resumeFilePath);
//     throw new Error("AI processing failed.");
//   }
// };

// module.exports = { processResume };

/**
 * AI Resume Processing Utility
 * Handles parsing, scoring, question generation, and final evaluation using Gemini APIs.
 */

import fs from "fs";
import PDFParser from "pdf2json";
import GoogleGenerativeAI from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// ====================== GEMINI CLIENT SETUP ======================
const genAI1 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1); // Resume Review
const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2); // Question Generation
const genAI3 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY3); // Overall Evaluation

// ====================== SAFE STRING DECODER ======================
const safeDecode = (str) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str.replace(/%([0-9A-F]{2})/gi, (m, p1) => {
      const code = parseInt(p1, 16);
      return code >= 32 && code <= 126 ? String.fromCharCode(code) : " ";
    });
  }
};

// ====================== EXTRACT TEXT FROM PDF ======================
const extractResumeText = async (filePath) => {
  const pdfBuffer = fs.readFileSync(filePath);
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((t) => {
          t.R.forEach((r) => {
            text += safeDecode(r.T) + " ";
          });
        });
      });

      // Normalize text
      text = text
        .replace(/\s+/g, " ")
        .replace(/[^\x20-\x7E]+/g, " ")
        .trim();

      resolve(text);
    });

    pdfParser.parseBuffer(pdfBuffer);
  });
};

// ====================== RESUME REVIEW (AI 1) ======================
const scoreResume = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an experienced recruiter. Analyze the candidate's resume in the context of this job.
Return STRICT JSON with this structure:
{
  "skills_found": [ "..." ],
  "missing_skills": [ "..." ],
  "scores": {
    "Experience": 1-10,
    "Skills": 1-10,
    "Projects": 1-10,
    "Education": 1-10
  },
  "summary": "short summary (max 3 lines)"
}
JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}
`;

    const model = genAI1.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("AI JSON parse error (Resume Scoring):", err);
    return {
      skills_found: [],
      missing_skills: [],
      scores: {},
      summary: "Resume analysis failed",
    };
  }
};

// ====================== QUESTION GENERATION (AI 2) ======================
const generateQuestions = async (resumeText, jobRole) => {
  try {
    const prompt = `
You are a technical interviewer.
Generate 4-6 short, diverse technical questions for this candidate
based on their resume and the given role.
Return STRICT JSON in this format:
{
  "job_role": "${jobRole}",
  "questions": ["Q1", "Q2", "Q3", "Q4", "Q5"]
}
RESUME:
${resumeText}
`;

    const model = genAI2.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return parsed.questions || [];
  } catch (err) {
    console.error("AI JSON parse error (Resume Questions):", err);
    return [];
  }
};

// ====================== OVERALL EVALUATION (AI 3) ======================
const overallEvaluation = async (scoreData, questionsData) => {
  try {
    const prompt = `
You are a senior hiring evaluator. Based on the resume analysis and generated questions,
give a concise hiring evaluation. Respond ONLY in this JSON format:
{
  "overall_rating": "Excellent" | "Good" | "Average" | "Poor",
  "feedback": "2-3 sentences giving personalized feedback",
  "recommendation": "Hire" | "Consider" | "Reject"
}
RESUME SCORES:
${JSON.stringify(scoreData)}

QUESTIONS:
${JSON.stringify(questionsData)}
`;

    const model = genAI3.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("AI JSON parse error (Overall Eval):", err);
    return {
      overall_rating: "Average",
      feedback: "Evaluation process failed.",
      recommendation: "Consider",
    };
  }
};

// ====================== MAIN RESUME PROCESSOR ======================
export const processResume = async (
  resumeFilePath,
  jobDescription,
  jobRole
) => {
  try {
    const resumeText = await extractResumeText(resumeFilePath);

    // Run all three AI tasks concurrently
    const [scoreData, questionsData] = await Promise.all([
      scoreResume(resumeText, jobDescription),
      generateQuestions(resumeText, jobRole),
    ]);

    const finalEval = await overallEvaluation(scoreData, questionsData);

    // 🟢 Resume file is NOT deleted anymore (as per your request)
    return {
      resume_summary: scoreData.summary,
      resume_scores: scoreData.scores,
      resumeBasedQuestions: questionsData,
      final_evaluation: finalEval,
    };
  } catch (err) {
    console.error("AI processing error:", err);
    throw new Error("AI processing failed.");
  }
};
