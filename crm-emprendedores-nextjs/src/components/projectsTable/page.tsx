"use client";

import "./projectsTable.css";
import { useState } from "react";

type Project = {
  title: string;
  client: string;
  status: string;
};

type ProjectsTableProps = {
  projects: Project[];
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const [sortKey, setSortKey] = useState<keyof Project>("title");
  const [ascending, setAscending] = useState(true);

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortKey].toLowerCase();
    const bValue = b[sortKey].toLowerCase();
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Project) => {
    if (key === sortKey) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  return (
    <div className="table-scroll">
      <table className="dashboardContainer__recentProjects-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nombre {sortKey === "title" ? (ascending ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("client")}>
              Cliente {sortKey === "client" ? (ascending ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("status")}>
              Estado {sortKey === "status" ? (ascending ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.title}</td>
              <td>{project.client}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
