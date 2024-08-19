import { Request, Response, Router } from "express";
import { resetRequestsCount } from "../helper/newsapi/cached";

const router:Router = Router();

router.get("/refreshApiKeys", (req:Request, res:Response)=>{
    try {
        resetRequestsCount();
        res.status(200).send("\n === CRON JOB successfully executed. === ")
    } catch (error) {
        console.error("CRON JOB ERROR: "+ error);
        res.status(500).send("\n === CRON JOB failed to execute successfully. === ")
    }
})

export default router;