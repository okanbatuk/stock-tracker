import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";

// 1) Express instance
export const app = express();

// 2) Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(express.json());
