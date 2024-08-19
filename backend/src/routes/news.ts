import { Request, Response, Router } from "express";
import axios from "axios";
import { gemini } from "../helper/geminiapi/gemini";
import { getUserInterests, getUserSummaryStyle } from "../helper/db/db";
import extractUidFromToken from "../helper/auth/decodeToken";
import verifyToken from "../middleware/auth";
import getNews from "../helper/newsapi/getNews";

//============ Typescript stuff ==============

interface UserInfo {
    interests: string[],
    countryCode: string
}

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

const isNewsArticle = (value: NewsArticle[]): value is NewsArticle[] => !!value?.at(0)?.url;

const router: Router = Router();

let data:NewsArticle[]= [];

const getLinks = (articles: NewsArticle[]):string[] =>{
    const links: string[] =[];
    articles.forEach((article)=>{
        links.push(article.url);
    })

    return links;
}

router.get("/news-articles/", verifyToken, async (req:Request, res:Response)=>{
    console.log("\n============ news-articles ROUTE CALLED ===========\n");
    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // API Request: https://gnews.io/api/v4/search?q=KEYWORD-1 OR KEYWORD-2 OR ... KEYWORD-N&lang=LANG-CODE&country=CODE&max=5&apikey=GNEWSAPIKEY

    const idToken: string = req.headers.authorization!.split(' ')[1];
    const userId: string = await extractUidFromToken(idToken);
    const userInfoData: UserInfo = await getUserInterests(userId);

    // const countryCode: string = userInfoData.countryCode.toLowerCase();

    // console.log(userInfoData);

    const searchString = userInfoData.interests.join(" OR ");
    const formattedSearchString = searchString.replace(/[^a-zA-Z ]/g, "");

    try {
        console.log("\n==== CALLING getNews() with formatted search string data ====");
        
        data = await getNews(formattedSearchString);
        
        console.log("GOT RESPONSE FROM getNews() with news data.\n");
        
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Could Not fetch news data"});
    }
});

router.get("/news-summary/", verifyToken ,async (req:Request, res:Response)=>{
    //News articles summary using gemini
    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.

    console.log("\n============ news-summary ROUTE CALLED ===========\n");

    const idToken: string = req.headers.authorization!.split(' ')[1];
    const userId: string = await extractUidFromToken(idToken);
    const summaryStyle: string = await getUserSummaryStyle(userId);

    if( data.length==0 ||!isNewsArticle(data)){
        console.log("Data in news articles stored on server: " + data);
        console.error("\nEither NO news articles data found in global data variable stored on the server --- OR --- Data is not in the expected format.");
        res.status(404).json({"Error":"Either NO news articles data found in global data variable stored on the server --- OR --- Data is not in the expected format."});
        return;
    }

    console.log("\nData for news articles on server is of correct type. Now creating summary... ");
    
    const links:string[] = getLinks(data);
    console.log("Sending this for getting summary: \nSummary style: " + summaryStyle + "\nLinks: " + links);

    const response:string = await gemini(summaryStyle, links);
    // const finalResponse = {"summary": JSON.stringify(response)};
    const finalResponse = {"summary": response};

    console.log("Got response from gemini api. Now sending to frontend...\n");
    
    res.json(finalResponse)
});

export default router;