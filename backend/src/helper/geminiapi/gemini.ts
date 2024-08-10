import { GoogleGenerativeAI } from "@google/generative-ai";

interface Interests{
    interests: string[],
    country: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});


export async function gemini(summaryStyle: string, links: string[]){
    
    const prompt = `Given is an array containing links to news-articles. Summarise each article in the style of ${summaryStyle}. URL Links: ${links}. Return a simple string.`;
    const result = await model.generateContent(prompt);

    return result.response.text();
}

export async function interestsIdentification(userInput:string): Promise<Interests>{

    const prompt = `Identify interests, categories, locations, and such keywords from the given data, that may be used for searching news articles based on them. If a country is mentioned, store it separately in the object with it's general country code. Respond with an object in the form of this example: {interests: ["keyword1","keyword2"], country: "US"}. IMPORTANT: Respond in valid JSON as per given format. Data: ${userInput}`;
    const result = await model.generateContent(prompt);

    const data = JSON.parse(result.response.text());
    return data;
}