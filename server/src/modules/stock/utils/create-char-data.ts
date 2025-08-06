import Stock from "../stock.model";

export const createCharData = (stock: Stock) => {
  return {
    labels: stock.priceHistory.map((price) =>
      new Date(price.timestamp).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    ),
    datasets: [
      {
        label: `${stock.symbol} Fiyat (₺)`,
        data: stock.priceHistory.map((price) => price.price),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };
};
