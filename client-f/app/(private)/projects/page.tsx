'use client';

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  description: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3333/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProjects(data);
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3333/api/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchProjects(); // обновим список
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Мои проекты</h3>

      <form onSubmit={createProject} className="mb-4">
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Название проекта"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Создать проект</button>
      </form>

      <ul className="list-group">
        {projects.map((project) => (
          <li key={project._id} className="list-group-item">
            <h5 className="mb-1">{project.title}</h5>
            <p className="mb-0">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
