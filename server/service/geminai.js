const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateContent(prompt) {
 try {
     const result = await model.generateContent(`${prompt} Give a response in under 100 words.  `);
     return result.response.text();
 } catch (error) {
     console.error("Error generating content:", error);
 }
}

module.exports = {generateContent}