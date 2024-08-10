import { Request, Response, Router } from "express";
import axios from "axios";
import { gemini } from "../helper/geminiapi/gemini";
import { getUserInterests, getUserSummaryStyle } from "../helper/db/db";
import extractUidFromToken from "../helper/auth/decodeToken";
import verifyToken from "../middleware/auth";

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

const router: Router = Router();

const data = [
    {
        "title": "Goldman’s David Solomon predicts Fed won’t make emergency rate cuts",
        "description": "Goldman Sachs CEO David Solomon said the Federal Reserve won’t make emergency rate cuts before the central bankers meet in September, despite Monday's Wall Street meltdown.",
        "content": "Goldman Sachs CEO David Solomon said the Federal Reserve won’t make emergency rate cuts before the central bankers meet in September, despite Monday’s Wall Street meltdown over heightened risks of a recession.\n“I don’t expect that you’ll see anything... [3851 chars]",
        "url": "https://nypost.com/2024/08/07/business/goldman-sachs-ceo-david-solomon-predicts-federal-reserve-wont-make-emergency-rate-cuts/",
        "image": "https://nypost.com/wp-content/uploads/sites/2/2024/08/newspress-collage-y3rg3qmkv-1723049769146.jpg?quality=75&strip=all&1723035443&w=1024",
        "publishedAt": "2024-08-07T16:58:10Z",
        "source": {
            "name": "New York Post",
            "url": "https://nypost.com"
        }
    },
    {
        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
        "publishedAt": "2022-09-28T08:14:24Z",
        "source": {
          "name": "PhoneArena",
          "url": "https://www.phonearena.com"
        }
    }

]

const getLinks = (articles: NewsArticle[]):string[] =>{
    const links: string[] =[];
    articles.forEach((article)=>{
        links.push(article.url);
    })

    return links;
}

router.get("/news-articles/", verifyToken, async (req:Request, res:Response)=>{

    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // Expect uid passed as url param
    // Expected GET Request URI: keywords[]=category-1&keywords[]=category-2&keywords[]=category-n ...
    // Expected API Request: https://gnews.io/api/v4/search?q=KEYWORD-1 OR KEYWORD-2 OR ... KEYWORD-N&lang=LANG-CODE&country=CODE&max=5&apikey=GNEWSAPIKEY

    // const userId: string = req.params.uid;
    const idToken: string = req.headers.authorization!.split(' ')[1];
    const userId: string = await extractUidFromToken(idToken);
    const userInfoData: UserInfo = await getUserInterests(userId);
    // const countryCode: string = userInfoData.countryCode.toLowerCase();

    console.log(userInfoData);

    const searchString = userInfoData.interests.join(" OR ");
    console.log(searchString);

    // const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&in=title,description,content&lang=en&&nullable=image&sortby=publishedAt&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    // const response = await axios.get(`https://gnews.io/api/v4/search?q=election OR olympics&lang=en&country=us&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    // console.log(`https://gnews.io/api/v4/search?q=${searchString}&lang=en&country=${countryCode}&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    
    // console.log(response.data);

    // data = response.data.articles!;
    res.json(data);
});

router.get("/news-summary/", verifyToken ,async (req:Request, res:Response)=>{
    //News articles summary using gemini
    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // Expected body: { "links": ["https://link1.com/","https://link2.com/"... "https://link3.com/"] }

    const idToken: string = req.headers.authorization!.split(' ')[1];
    const userId: string = await extractUidFromToken(idToken);
    const summaryStyle: string = await getUserSummaryStyle(userId);

    if(!data){
        console.log("Data in news articles stored on server: " + data);
        res.json({"Error":"No news articles data found"});
    }

    // const links: string[] = req.body.links;
    const links:string[] = getLinks(data);
    console.log("Sending this for getting summary: \nSummary style: " + summaryStyle + "\nLinks: " + links);
    

    const response = await gemini(summaryStyle, links);

    res.json({"summary": response})
});

export default router;