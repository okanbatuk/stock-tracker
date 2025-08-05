import { Router } from "express";
import WatchlistRepository from "./watchlist.repository";
import { WatchlistService } from "./watchlist-service";
import { WatchlistController } from "./watchlist.controller";

const router = Router();

const ctrl = new WatchlistController();

router.get("/", ctrl.get);
router.post("/", ctrl.update);

export default router;
