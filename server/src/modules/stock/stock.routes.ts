import { Router } from "express";
import { StockController } from "./stock.controller";
import StockRepository from "./stock.repository";
import { StockService } from "./stock.service";

const router = Router();
const controller = new StockController();

router.get("/", controller.getAll);
router.get("/:symbol", controller.getPriceHistory);

export default router;
