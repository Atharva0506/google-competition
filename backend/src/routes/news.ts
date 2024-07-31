import { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = Router();

// const keywords = "keywords[]=technology&keywords[]=india&keywords[]=politics";
// items?ids[]=1&ids[]=2&ids[]=3

router.get("/news-articles/", async (req:Request, res:Response)=>{
    const request = req.query;
    console.log(request);

    const response = await axios.get("https://gnews.io/api/v4/search?q=Technology OR politcs AND India OR Google&lang=en&country=in&max=5&apikey="+process.env.GNEWSAPIKEY);
    res.json(response.data); 
    //News articles fetching logic
    
    // res.json({"Entered categories":req.query.keywords})
});

router.get("/news-summary",(req:Request, res:Response)=>{
    //News articles summary using gemini
    res.json({"summary":"lorem ipsum asfnafhiue sanfsnjfoejowejfoa mfoasdjofje..."})
});

export default router;