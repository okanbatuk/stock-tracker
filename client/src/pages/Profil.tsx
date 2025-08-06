import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { UserUpdatePayload } from "../types/api";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const NAME_REGEX = /^[A-Za-zÇçĞğİıÖöŞşÜü ]{3,50}$/;
const PWD_REGEX = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;

export default function Profile() {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useAuth();

  const [email] = useState(() => {
    const payload = jwtDecode<{ email: string }>(token!);
    return payload.email;
  });

  const nav = useNavigate();

  const validName = useMemo(
    () => name === "" || NAME_REGEX.test(name.trim()),
    [name],
  );
  const validOldPassword = useMemo(
    () => oldPassword === "" || PWD_REGEX.test(oldPassword),
    [oldPassword],
  );
  const validNewPassword = useMemo(
    () => newPassword === "" || PWD_REGEX.test(newPassword),
    [newPassword],
  );
  const passwordsMatch = useMemo(
    () => newPassword === confirmPassword,
    [newPassword, confirmPassword],
  );

  const allValid = useMemo(() => {
    const nameOk = name === "" || validName;

    // Şifre alanlarından en az biri doluysa hepsi dolu ve kurallara uygun olmalı
    const passwordSectionFilled =
      oldPassword !== "" || newPassword !== "" || confirmPassword !== "";

    const passwordSectionValid =
      oldPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      validOldPassword &&
      validNewPassword &&
      passwordsMatch;

    const pwdOk = passwordSectionFilled ? passwordSectionValid : true;

    const nothingToSave =
      name === "" &&
      oldPassword === "" &&
      newPassword === "" &&
      confirmPassword === "";

    return nameOk && pwdOk && !nothingToSave;
  }, [
    name,
    validName,
    oldPassword,
    validOldPassword,
    newPassword,
    validNewPassword,
    passwordsMatch,
    confirmPassword,
  ]);

  const handleUpdate = async (payload: UserUpdatePayload) => {
    try {
      await api.patch("/auth/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setName("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Bilgileriniz başarıyla güncellendi.");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Güncelleme işleminde bir hata oluştu!",
      );
      throw err;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;

    const payload: UserUpdatePayload = {};
    if (name.trim()) payload.name = name.trim();
    if (oldPassword && newPassword) {
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }

    await handleUpdate(payload);
  };

  const inputClasses = (valid: boolean, value: string) =>
    `mt-1 w-full px-4 py-2 rounded-md border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
      value === ""
        ? "border-slate-300 focus:ring-green-500"
        : valid
          ? "border-green-500 focus:ring-green-500"
          : "border-red-500 focus:ring-red-500"
    }`;

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6"
      >
        <button
          type="button"
          onClick={() => nav("/")}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 transition"
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

        <h2 className="text-2xl font-bold text-center text-slate-800">
          Profil Bilgileri
        </h2>

        {/* Email (salt okunur) */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">E-posta</span>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-1 w-full px-4 py-2 rounded-md border border-slate-300 bg-slate-100 text-slate-500 cursor-not-allowed"
          />
        </label>

        {/* Ad */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Ad</span>
          <input
            className={inputClasses(validName, name)}
            placeholder="Ad"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && !validName && (
            <p className="text-xs text-red-500 mt-1">
              3-50 karakter, yalnızca harf ve boşluk.
            </p>
          )}
        </label>

        {/* Mevcut Şifre */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">
            Mevcut Şifre
          </span>
          <input
            type="password"
            className={inputClasses(validOldPassword, oldPassword)}
            placeholder="••••••••"
            maxLength={50}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {oldPassword && !validOldPassword && (
            <p className="text-xs text-red-500 mt-1">
              En az bir büyük, bir küçük harf ve bir rakam.
            </p>
          )}
        </label>

        {/* Yeni Şifre */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Yeni Şifre</span>
          <input
            type="password"
            className={inputClasses(validNewPassword, newPassword)}
            placeholder="••••••••"
            maxLength={50}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPassword && !validNewPassword && (
            <p className="text-xs text-red-500 mt-1">
              En az bir büyük, bir küçük harf ve bir rakam.
            </p>
          )}
        </label>

        {/* Yeni Şifreyi Onayla */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">
            Yeni Şifreyi Onayla
          </span>
          <input
            type="password"
            className={inputClasses(passwordsMatch, confirmPassword)}
            placeholder="••••••••"
            maxLength={50}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">Şifreler eşleşmiyor.</p>
          )}
        </label>

        <button
          type="submit"
          disabled={!allValid}
          className={`w-full font-semibold py-2 rounded-md transition
            ${
              allValid
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}
