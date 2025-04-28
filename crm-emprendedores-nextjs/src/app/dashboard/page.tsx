"use client";

import Link from "next/link";
import "./dashboard.css";
import Sidebar from "@/components/sidebar/page";
import ProjectsTable from "@/components/projectsTable/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clientsRequest, projectsRequest } from "../../utils/api/axiosFetch";

interface Project {
  title: string;
  clientId: {
    name: string;
  };
  status: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      router.push("/");
    } else {
      const user = JSON.parse(storedUser);

      clientsRequest(user._id, token)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
          router.push("/");
        });

      projectsRequest(user._id, token)
        .then((res) => {
          setUserProjects(res.data);
        })
        .catch((err) => {
          console.error(err);
          router.push("/");
        });
    }
  }, []);

  return (
    <>
      <Sidebar />
      <div className="dashboardContainer">
        <div className="dashboardContainer__header">
          <h2>Mi panel</h2>
          <Link href="/profile">Editar mi perfil</Link>
        </div>
        <div className="dashboardContainer__clientsAndProjects">
          <div className="dashboardContainer__clientsAndProjects-clients">
            <h3>Clientes Actuales</h3>
            <p>{userData.length}</p>
          </div>
          <div className="dashboardContainer__clientsAndProjects-projects">
            <h3>Proyectos Actuales</h3>
            <p>{userProjects.length}</p>
          </div>
        </div>
        <div className="dashboardContainer__recentProjects">
          <div className="dashboardContainer__recentProjects-title">
            <h2>Todos mis Projectos</h2>
          </div>
          <ProjectsTable
            projects={userProjects.map((project) => ({
              name: project.title,
              client: project.clientId.name,
              status: project.status,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
