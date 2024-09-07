import axios from "axios";
import { getCurrentApiKey, incrementReqCount } from "./cached";
import dotenv from "dotenv";
dotenv.config();

interface NewsArticle {
    "title": string,
    "description": string,
    "content": string,
    "url": string,
    "image": string,
    "publishedAt": string,
    "source": {
        "name": string,
        "url": string
    }
};

export default async function getNews(searchString: string): Promise<NewsArticle[]> {
    console.log("\ngetNews() CALLED");
    
    const numberOfArticles = 5; //How many articles to fetch

    try {

        const apiKeyNumber:number = await getCurrentApiKey();
        const apiKey = process.env[`GNEWSAPIKEY${apiKeyNumber}`] as string;

        const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&in=title,description,content&lang=en&nullable=image&sortby=publishedAt&max=${numberOfArticles}&apikey=${apiKey}`);
        
        if(response.status == 200){
            const data = await response.data.articles!;
            return data;
        } else {
            return [];
        }

    } catch (error) {
        console.error(error);
        return [];
    }
}