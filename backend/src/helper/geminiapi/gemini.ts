import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SafetySetting } from "@google/generative-ai";

interface Interests{
    interests: string[],
    country: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);

export async function gemini(summaryStyle: string, links: string[]){
    
    const safetySettings: SafetySetting[] = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction:`You are ${summaryStyle}. Return simple plain text. Each article's summary, in the style of how your character, separated by two new line characters. No headings required. Each summary between 45 to 80 words. Be creative and act like your character but focus on summarizing the actual article content. (Strictly avoid and exclude innapropriate, offensive things, hate speech)`,
        generationConfig: { 
            responseMimeType: "text/plain",
            temperature: 0.8
         },
         safetySettings
    });

    const prompt = `Summarise each article's content in the given array of their URL: ${links}`;

    const result = await model.generateContent(
        prompt
    );

    // const result = "Day 16 of the 2024 Olympics has been a blast, with Team GB bringing home some shiny medals.  We're talking about track cycling, hockey, and even some weightlifting action. Catch all the highlights on TV, because it's been a doozy. \n\nFusion research is reaching new levels of awesome.  Scientists are using it to fight cancer, power spaceships, and even provide clean energy for the planet. This isn't just science fiction, folks. This is the future.\n\nMacron's giving a shout-out to France's Olympic heroes.  The guy's a true patriot, celebrating the nation's athletes and their accomplishments. It's a motivational speech that'll make you want to grab your own medals. \n\n\Sky Sports is bringing you all the Premier League and EFL action, folks.  From goals to tackles, you won't miss a moment. Get ready for some serious football fun. \n\nThe Olympics are on, and you can catch all the action on your TV.  It's time to cheer on the world's best athletes, and it's gonna be epic."
    // console.log(result.response.text());
    // console.log(result);
    
    return result.response.text();
    // return result;
}

export async function interestsIdentification(userInput:string): Promise<Interests>{

    console.log("Identifying interests by requesting Gemini API... \nUser input string is: "+ userInput);
    

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