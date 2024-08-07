import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

export default async function gemini(){
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Summarise this news article in the style of how Hagrid from Harry Potter: https://www.rawstory.com/how-a-futuristic-material-is-able-to-change-its-properties-from-soft-to-rigid-and-back/";
    
    const result = await model.generateContent(prompt);
    // console.log(result);
    console.log(result.response?.text());

    return result.response.text();
}