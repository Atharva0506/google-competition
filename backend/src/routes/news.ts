import { Request, Response, Router } from "express";
import axios from "axios";
import { gemini } from "../helper/geminiapi/gemini";
import { getUserInterests, getUserSummaryStyle } from "../helper/db/db";
import verifyToken from "../middleware/auth";

const router: Router = Router();

router.get("/news-articles/:uid", verifyToken, async (req:Request, res:Response)=>{

    // Expect the request to be authorised- Bearer token from firebase current user needs to be passed as header from frontend.
    // Expect uid passed as url param
    // Expected GET Request URI: keywords[]=category-1&keywords[]=category-2&keywords[]=category-n ...
    // Expected API Request: https://gnews.io/api/v4/search?q=KEYWORD-1 OR KEYWORD-2 OR ... KEYWORD-N&lang=LANG-CODE&country=CODE&max=5&apikey=GNEWSAPIKEY
    
    const userId: string = req.params.uid;
    const interests: string[] = await getUserInterests(userId);
    
    const searchString = interests.join(" OR ");
    
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&lang=en&country=in&max=1&apikey=${process.env.GNEWSAPIKEY}`);

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