import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { WatchedStock } from "../types/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stocks, setStocks] = useState<WatchedStock[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Socket bağlantısı (backend 5 dk’da bir emit edecek)
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      auth: { token },
    });

    socket.emit("join-room");

    socket.on("price-update", (payload) => {
      setStocks((prev) =>
        prev.map((s) =>
          s.symbol === payload.symbol
            ? { ...s, price: payload.price, change: payload.change }
            : s,
        ),
      );
    });

    return () => {
      socket.disconnect(); // sadece disconnect çağır
    };
  }, [token]);

  // İlk yükleme
  useEffect(() => {
    api
      .get("/watchlist", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStocks(res.data.data));
  }, [token]);

  const remove = (symbol: string) => {
    api
      .post(
        "/watchlist",
        {
          symbols: stocks
            .filter((s) => s.symbol !== symbol)
            .map((s) => s.symbol),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        setStocks((prev) => prev.filter((s) => s.symbol !== symbol));
        toast.success("Hisse takipten çıkarıldı.");
      });
  };

  return (
    <div className="flex items-start justify-center w-full min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl mt-8">
        {/* header + logout */}
        <header className="flex justify-between items-center px-6 py-4 border-b">
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Profil
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/stocks")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Ayarlar
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Çıkış
            </button>
          </div>
        </header>

        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-slate-800">
            Takip Ettiğim Hisseler
          </h2>
        </div>

        <main className="p-6">
          {stocks.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-slate-900">
                Henüz bir hisse takip etmiyorsunuz.
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                İlk hissenizi eklemek için “Ayarlar” butonunu kullanabilirsiniz.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {stocks.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center py-4 hover:bg-slate-50 transition px-2"
                >
                  <div>
                    <span className="font-semibold text-slate-800">
                      {s.symbol}
                    </span>
                    <span className="ml-2 text-sm text-slate-600">
                      {s.name}
                    </span>
                    {s.price !== undefined ? (
                      <span
                        className={`ml-4 text-sm font-medium ${
                          s.change! >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {s.price.toFixed(2)} TL
                        {s.change !== undefined && (
                          <>
                            {" "}
                            ({s.change >= 0 ? "+" : ""}
                            {s.change.toFixed(2)}%)
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="ml-4 text-sm text-slate-400">
                        Yükleniyor…
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => remove(s.symbol)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Takibi Bırak
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
