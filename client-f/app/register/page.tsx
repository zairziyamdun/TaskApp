'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const newErrors: { [key: string]: string } = {};
    if (!username.trim()) newErrors.username = "Имя обязательно";
    if (!email.trim()) newErrors.email = "Email обязателен";
    if (!password.trim()) newErrors.password = "Пароль обязателен";
    if (password !== confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3333/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Ошибка регистрации");
        return;
      }

      router.push("/login");
    } catch (err) {
      setServerError("Сервер не отвечает:" + err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Регистрация</h2>
      <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text" className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Повторите пароль</label>
          <input
            type="password" className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <button type="submit" className="btn btn-success w-100">Зарегистрироваться</button>
      </form>
    </div>
  );
}
