'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) newErrors.email = "Email обязателен";
    if (!password.trim()) newErrors.password = "Пароль обязателен";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3333/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError("Неверные учетные данные");
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setServerError("Сервер не отвечает:" + err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Вход в Taskapp</h2>

        {serverError && (
          <div className="alert alert-danger text-center">{serverError}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Войти</button>
        </form>
      </div>
    </div>
  );
}
