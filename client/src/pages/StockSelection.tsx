import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Stock } from "../types/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function StockSelection() {
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    api
      .get("/stock", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAllStocks(res.data.data));
  }, [token]);

  useEffect(() => {
    api
      .get("/watchlist", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setSelected(res.data.data.map((s: Stock) => s.symbol)));
  }, [token]);

  const handleSave = () => {
    api
      .post(
        "/watchlist",
        { symbols: selected },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        navigate("/");
      });
  };

  const toggle = (symbol: string) =>
    setSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );

  return (
    <div className="flex items-start justify-center w-full min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl mt-8">
        <header className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-slate-800">Hisse Seçimi</h1>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-16 right-12 p-2 rounded-full hover:bg-slate-200 transition"
            aria-label="Ana Sayfa"
          >
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15l3-3 3 3"
              />
            </svg>
          </button>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allStocks.map((stock) => (
              <label
                key={stock.id}
                className="flex items-center space-x-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(stock.symbol)}
                  onChange={() => toggle(stock.symbol)}
                  className="accent-blue-600"
                />
                <div>
                  <span className="font-semibold text-slate-700">
                    {stock.symbol}
                  </span>
                  <p className="text-sm text-slate-500">{stock.name}</p>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Kaydet ve Devam Et
          </button>
        </main>
      </div>
    </div>
  );
}
