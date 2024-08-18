import express, {Express, NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users";
import newsRouter from "./routes/news";
import verifyToken from "./middleware/auth";

require('dotenv').config(); //Need this for environment variables - dotenv

import cors from "cors";

const app: Express = express();

app.use(cors({
    origin: process.env.HOST_DOMAIN
}));

const allowCrossDomain = (req: Request, res:Response, next:NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, process.env.HOST_DOMAIN);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `text/plain`);
    next();
};

app.use(allowCrossDomain);

app.use(express.json())

app.use("/api/users",usersRouter);
app.use("/api/news",newsRouter);

app.get("/",(req,res)=>{
    res.send("Hello world!");
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`);
})

export default app;