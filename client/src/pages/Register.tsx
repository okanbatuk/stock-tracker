import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import type { RegisterPayload } from "../types/api";

const NAME_REGEX = /^[A-Za-zÇçĞğİıÖöŞşÜü ]{3,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PWD_REGEX = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/;

export default function Register() {
  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const validName = useMemo(
    () => NAME_REGEX.test(form.name.trim()),
    [form.name],
  );
  const validEmail = useMemo(() => EMAIL_REGEX.test(form.email), [form.email]);
  const validPassword = useMemo(
    () => PWD_REGEX.test(form.password),
    [form.password],
  );
  const passwordsMatch = useMemo(
    () => form.password === confirmPassword,
    [form.password, confirmPassword],
  );

  const allValid = validName && validEmail && validPassword && passwordsMatch;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    await register(form);
    nav("/login");
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
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Kayıt Ol
        </h2>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Ad</span>
          <input
            className={inputClasses(validName, form.name)}
            placeholder="Ad"
            value={form.name}
            maxLength={50}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {form.name && !validName && (
            <p className="text-xs text-red-500 mt-1">
              3-50 karakter, yalnızca harf ve boşluk.
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">E-posta</span>
          <input
            className={inputClasses(validEmail, form.email)}
            type="email"
            placeholder="ornek@mail.com"
            value={form.email}
            maxLength={50}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {form.email && !validEmail && (
            <p className="text-xs text-red-500 mt-1">
              Geçerli bir e-posta girin.
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Şifre</span>
          <input
            className={inputClasses(validPassword, form.password)}
            type="password"
            placeholder="••••••••"
            value={form.password}
            maxLength={50}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {form.password && !validPassword && (
            <p className="text-xs text-red-500 mt-1">
              En az 8 karakter, büyük-küçük harf ve bir rakam.
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">
            Şifreyi Onayla
          </span>
          <input
            className={inputClasses(passwordsMatch, confirmPassword)}
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            maxLength={50}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">Şifreler eşleşmiyor.</p>
          )}
        </label>

        <button
          type="submit"
          disabled={!allValid}
          className={`w-full font-semibold py-2 rounded-md transition ${
            allValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          Kayıt Ol
        </button>

        <p className="text-center text-sm text-slate-600">
          Zaten hesabınız var mı?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Giriş yap
          </Link>
        </p>
      </form>
    </div>
  );
}
