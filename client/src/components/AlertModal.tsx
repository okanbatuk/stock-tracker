import { useState } from "react";
import api from "../api/axios";

interface Props {
  symbol: string;
  onClose: () => void;
}

export default function AlertModal({ symbol, onClose }: Props) {
  const [price, setPrice] = useState("");

  const save = () => {
    api.post("/alerts", { symbol, targetPrice: +price });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h3>{symbol} için alarm kur</h3>
        <input
          className="border p-1"
          placeholder="hedef fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={save}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
