import Link from "next/link";
import "./dashboard.css";
import Sidebar from "@/components/sidebar/page";

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
          <table className="dashboardContainer__recentProjects-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cliente</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sitio Web Portafolio</td>
                <td>Juan Pérez</td>
                <td>En progreso</td>
              </tr>
              <tr>
                <td>Tienda Online</td>
                <td>Lucía Gómez</td>
                <td>Completado</td>
              </tr>
              <tr>
                <td>Landing Page</td>
                <td>Empresa XYZ</td>
                <td>Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
