import { GoogleGenerativeAI } from "@google/generative-ai";

interface Interests{
    interests: string[],
    country: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);


export async function gemini(summaryStyle: string, links: string[]){
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction:`You are ${summaryStyle}. Your response must a single long string containing summary of all news articles, each separated by two new line characters.`,
        generationConfig: { 
            responseMimeType: "text/plain",
            temperature: 0.8,
         }
    });

    const prompt = `Summarise each article's content in the given array of their URL: ${links}.`;

    const result = await model.generateContent(prompt);
    // const result = "Goldman Sachs CEO David Solomon predicts that the Federal Reserve will not make emergency rate cuts, even as the US economy faces challenges. Solomon believes that the Fed is likely to maintain its current course, even if there is a recession. Meanwhile, fresh renders of the Google Pixel 7 and Pro have been leaked, revealing a refined design with a more prominent camera bump and a unique color option for the Pro model. The Pixel 7 series is expected to be unveiled at Google's annual hardware event in October."
    console.log(result.response.text());
    
    return result.response.text();
}

export async function interestsIdentification(userInput:string): Promise<Interests>{

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { 
            responseMimeType: "application/json",
         }
    });

    const prompt = `Identify interests, categories, locations, and such keywords from the given data, that may be used for searching news articles based on them. If a country is mentioned, store it separately in the object with it's general country code. Respond with an object in the form of this example: {interests: ["keyword1","keyword2"], country: "US"}. IMPORTANT: Respond in valid JSON as per given format. Data: ${userInput}`;
    const result = await model.generateContent(prompt);

    const data = JSON.parse(result.response.text());
    return data;
}