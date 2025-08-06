import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import type { ChartData, Info, StockChartProps } from "../types/api";

const StockChart: React.FC<StockChartProps> = ({ symbol, hours = 24 }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stocks/${symbol}?hours=${hours}`);
        const data = await response.json();

        if (response.ok) {
          setChartData(data);
          setInfo(data.info);
        } else {
          setError(data.error);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(
          err.response?.data?.message ||
            "Sunucu henüz hazır değil biraz bekleyin.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Her dakika güncelle

    return () => clearInterval(interval);
  }, [symbol, hours]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            return `₺${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Saat",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Fiyat (₺)",
        },
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function (value: any) {
            return "₺" + value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-gray-600 mt-2">
          Henüz hiç fiyat verisi kaydedilmemiş olabilir.
        </p>
      </div>
    );

  return (
    <div>
      {info && (
        <div className="text-sm text-gray-600 mb-2">
          {info.timeRange} • İlk kayıt:{" "}
          {new Date(info.firstRecord!).toLocaleString("tr-TR")}
        </div>
      )}
      <div style={{ height: "400px", width: "100%" }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default StockChart;
