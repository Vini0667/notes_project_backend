import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json" with { type: "json" };
import dotenv from "dotenv";
import type { Request, Response } from "express";

dotenv.config();

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello World!",
    });
});

export { PORT };
export default app;
