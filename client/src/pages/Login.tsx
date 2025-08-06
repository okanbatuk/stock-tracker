import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

type Form = { email: string; password: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PWD_REGEX = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;

export default function LoginPage() {
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const navigate = useNavigate();

  const validEmail = useMemo(() => EMAIL_REGEX.test(form.email), [form.email]);
  const validPassword = useMemo(
    () => PWD_REGEX.test(form.password),
    [form.password],
  );
  const allValid = validEmail && validPassword;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    const { data } = await login(form);
    navigate(data.firstLogin ? "/stocks" : "/");
  };

  const inputClasses = (valid: boolean, value: string) =>
    `mt-1 w-full px-4 py-2 rounded-md border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
      value === ""
        ? "border-slate-300 focus:ring-indigo-500"
        : valid
          ? "border-indigo-500 focus:ring-indigo-500"
          : "border-red-500 focus:ring-red-500"
    }`;

  const buttonClasses = () =>
    allValid
      ? "w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
      : "w-full bg-slate-300 text-slate-500 font-semibold py-2 rounded-md cursor-not-allowed";

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Giriş Yap
        </h2>

        {/* E-posta */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">E-posta</span>
          <input
            type="email"
            placeholder="ornek@mail.com"
            value={form.email}
            maxLength={50}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClasses(validEmail, form.email)}
          />
          {form.email && !validEmail && (
            <p className="text-xs text-red-500 mt-1">
              Geçerli bir e-posta girin.
            </p>
          )}
        </label>

        {/* Şifre */}
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Şifre</span>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            maxLength={50}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputClasses(validPassword, form.password)}
          />
          {form.password && !validPassword && (
            <p className="text-xs text-red-500 mt-1">
              En az bir büyük, bir küçük harf ve bir rakam içermeli.
            </p>
          )}
        </label>

        <button type="submit" className={buttonClasses()}>
          Giriş Yap
        </button>

        <p className="text-center text-sm text-slate-600">
          Henüz hesabınız yok mu?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Kayıt ol
          </Link>
        </p>
      </form>
    </div>
  );
}
