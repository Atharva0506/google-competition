import { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = Router();

interface SearchQuery {
    keywords: Array<string>
}

// const keywords = "keywords[]=technology&keywords[]=india&keywords[]=politics";
// items?ids[]=1&ids[]=2&ids[]=3

router.get("/news-articles/", async (req:Request<{},{},{},SearchQuery>, res:Response)=>{

    // Expected GET Request URI: keywords[]=category-1&keywords[]=category-2&keywords[]=category-n ...
    // Expected API Request: https://gnews.io/api/v4/search?q=KEYWORD-1 OR KEYWORD-2 OR ... KEYWORD-N&lang=LANG-CODE&country=CODE&max=5&apikey=GNEWSAPIKEY

    const keywords = req.query.keywords;
    console.log(keywords);
    

    const searchString = keywords.join(" OR ");
    console.log(searchString);
    
    
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchString}&lang=en&country=in&max=1&apikey=${process.env.GNEWSAPIKEY}`);
    res.json(response.data); 
    //News articles fetching logic
    
    // res.json({"Entered categories":keywords})
});

router.get("/news-summary",(req:Request, res:Response)=>{
    //News articles summary using gemini
    res.json({"summary":"lorem ipsum asfnafhiue sanfsnjfoejowejfoa mfoasdjofje..."})
});

export default router;