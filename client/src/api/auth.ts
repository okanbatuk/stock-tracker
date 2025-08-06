import toast from "react-hot-toast";
import type { LoginPayload, RegisterPayload } from "../types/api";
import api from "./axios";

export async function login(credentials: LoginPayload) {
  try {
    const { data } = await api.post("/auth/login", credentials);
    toast[data.success ? "success" : "error"](data.message);

    if (data.data.accessToken) {
      localStorage.setItem("token", data.data.accessToken);
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(
      err.response?.data?.message || "Sunucu henüz hazır değil biraz bekleyin.",
    );
    throw err;
  }
}

export async function register(payload: RegisterPayload) {
  try {
    const { data } = await api.post("/auth/register", payload);
    toast[data.success ? "success" : "error"](data.message);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Kayıt başarısız");
    throw err;
  }
}
