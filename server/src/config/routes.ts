import { Router } from "express";
import { authMiddleware } from "../shared";
import authRouter from "../modules/auth/auth.routes";
import stockRouter from "../modules/stock/stock.routes";
import watchlistRouter from "../modules/watchlist/watchlist.router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/stock", authMiddleware, stockRouter);
v1Router.use("/watchlist", authMiddleware, watchlistRouter);

export default v1Router;
