import path from "path";
import { sequelize } from "../config";
import { publishOnce } from "./publish-once";
import { insertSymbols } from "./insert-symbol";
import Stock from "../modules/stock/stock.model";

export default async function bootstrap(): Promise<void> {
  await sequelize.sync();

  const count = await Stock.count();
  if (count === 0) {
    console.log("[BOOT] stock table empty – adding…");
    await insertSymbols();
    console.log("[BOOT] stocks added.");
  }

  await publishOnce();
  console.log("[BOOT] initial price broadcast done.");
}
