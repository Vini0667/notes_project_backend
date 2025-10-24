import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) => {
    console.log(`Hello World!`);
    response.send("Hello World!");
});

export default app;
