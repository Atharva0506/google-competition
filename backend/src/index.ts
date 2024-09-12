import express, {Express, NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users";
import newsRouter from "./routes/news";
import newsAndSummaryRouter from "./routes/news-and-summary";
import cronRouter from "./routes/cron";

require('dotenv').config(); //Need this for environment variables - dotenv

import cors from "cors";

const app: Express = express();

app.use(cors({
    origin: [process.env.HOST_DOMAIN!, process.env.LOCAL_HOST!],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json())

app.use("/api/users",usersRouter);
app.use("/api/news",newsRouter);
app.use("/api/news-and-summary",newsAndSummaryRouter);
app.use("/api/cron",cronRouter);

app.get("/",(req,res)=>{
    res.send("Hello world!");
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`);
})

export default app;