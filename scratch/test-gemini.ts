import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent("hello");
    console.log("Response:", result.response.text());
  } catch (e: any) {
    console.error("Error for gemini-3.6-flash:", e.message);
  }
}

run();
