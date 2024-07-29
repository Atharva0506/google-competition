import express, {Express, Request, Response } from "express";
import usersRouter from "./routes/users";
import newsRouter from "./routes/news";
import verifyToken from "./middleware/auth";

import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json())

app.use("/api/users",usersRouter);
app.use("/api/news",verifyToken,newsRouter);

const PORT = 3000;

app.listen(3000, ()=>{
    console.log(`Listening at port ${PORT}`);
})