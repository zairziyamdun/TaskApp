'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3333/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link href="/projects" className="navbar-brand">
        Taskapp
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link href="/projects" className="nav-link btn btn-outline btn-sm ">
              Проекты
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">👤 {username}</span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
}
