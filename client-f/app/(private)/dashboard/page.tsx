'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3333/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Ошибка при получении профиля:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="text-center mt-5">Загрузка...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Добро пожаловать в Taskapp, {user?.username} 👋</h2>
      <div className="card p-3">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Роль:</strong> {user?.role}</p>
      </div>
    </div>
  );
}
