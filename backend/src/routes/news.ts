import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/news-articles",(req:Request, res:Response)=>{
    //News articles fetching logic
    res.json({"top 5 curated news articles":["sdf sd", "sdffsd", "..."]})
});

router.get("/news-summary",(req:Request, res:Response)=>{
    //News articles summary using gemini
    res.json({"summary":"lorem ipsum asfnafhiue sanfsnjfoejowejfoa mfoasdjofje..."})
});

export default router;