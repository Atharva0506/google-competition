import { Request, Response, Router } from "express";
import axios from "axios";
import { gemini } from "../helper/geminiapi/gemini";
import { getUserInterests, getUserSummaryStyle } from "../helper/db/db";
import verifyToken from "../middleware/auth";

interface UserInfo {
    interests: string[],
    countryCode: string
}

const router: Router = Router();

router.get("/news-articles/:uid", verifyToken, async (req:Request, res:Response)=>{

    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // Expect uid passed as url param
    // Expected GET Request URI: keywords[]=category-1&keywords[]=category-2&keywords[]=category-n ...
    // Expected API Request: https://gnews.io/api/v4/search?q=KEYWORD-1 OR KEYWORD-2 OR ... KEYWORD-N&lang=LANG-CODE&country=CODE&max=5&apikey=GNEWSAPIKEY

    const userId: string = req.params.uid;
    const userInfoData: UserInfo = await getUserInterests(userId);
    const countryCode: string = userInfoData.countryCode.toLowerCase();

    console.log(userInfoData);

    const searchString = userInfoData.interests.join(" OR ");
    console.log(searchString);

    const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&in=title,description,content&lang=en&&nullable=image&sortby=publishedAt&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    // const response = await axios.get(`https://gnews.io/api/v4/search?q=election OR olympics&lang=en&country=us&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    console.log(`https://gnews.io/api/v4/search?q=${searchString}&lang=en&country=${countryCode}&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    
    
    console.log(response.data);
    
    //response for testing frontend:
    /*
    
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
    }
    ]

    */

    const data = response.data.articles!;
    res.json(data);
});

router.get("/news-summary/:uid", verifyToken ,async (req:Request, res:Response)=>{
    //News articles summary using gemini
    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // Expect uid passed as url param
    // Expected body: { "links": ["https://link1.com/","https://link2.com/"... "https://link3.com/"] }

    const userId: string = req.params.uid;

    const summaryStyle: string = await getUserSummaryStyle(userId);
    const links: string[] = req.body.links;

    const response = await gemini(summaryStyle, links);
    res.json({"summary": response})
});

export default router;