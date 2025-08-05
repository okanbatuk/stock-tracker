import cors from "cors";
import helmet from "helmet";
import express from "express";
import { createServer } from "http";
import v1Router from "./routes";
import { errorHandler, routeNotFoundHandler } from "../shared";

// 1) Express instance
export const app = express();

// 2) Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use("/api/v1", v1Router);
app.use(routeNotFoundHandler);
app.use(errorHandler);
