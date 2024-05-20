import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import Routers from "./routes";
import connectDb from "./config/database";

const app = express();

app.use(cors());
app.use(helmet({
  noSniff: true,
  xPoweredBy: false,
}));
app.use(express.json());
connectDb();

app.use('/api/v1', Routers)
app.use("*", (req: Request, res: Response) => {
  const path = req.originalUrl;
  const method = req.method;
  return res.status(404).json({
    error: true,
    path,
    method,
    message: `The method ${method} is not defined on path ${path}`,
  });
});

export default app;
