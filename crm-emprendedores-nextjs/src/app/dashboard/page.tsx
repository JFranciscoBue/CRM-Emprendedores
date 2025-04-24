import Link from "next/link";
import "./dashboard.css";
import Sidebar from "@/components/sidebar/page";
import ProjectsTable from "@/components/projectsTable/page";

const Dashboard = () => {
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
            <p>5</p>
          </div>
          <div className="dashboardContainer__clientsAndProjects-projects">
            <h3>Proyectos Actuales</h3>
            <p>2</p>
          </div>
        </div>
        <div className="dashboardContainer__recentProjects">
          <div className="dashboardContainer__recentProjects-title">
            <h2>Proyectos Recientes</h2>
          </div>
          <ProjectsTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
