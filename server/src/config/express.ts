import cors from "cors";
import express from "express";
import helmet from "helmet";
import v1Router from "./routes";
import { errorHandler } from "../shared/middlewares/error-handler";

// 1) Express instance
export const app = express();

// 2) Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use("/api/v1", v1Router);
app.use(errorHandler);
