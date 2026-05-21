import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function list() {
  try {
    console.log("Listing available models with api key:", process.env.GEMINI_API_KEY ? "PRESENT" : "MISSING");
    
    // We can fetch from API directly if listModels doesn't exist on genAI, or we can use fetch/axios
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

list();
