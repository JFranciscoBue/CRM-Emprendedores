import "./projectsTable.css";

const ProjectsTable = () => {
  return (
    <div className="table-scroll">
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
          <tr>
            <td>Landing Page</td>
            <td>Empresa XYZ</td>
            <td>Pendiente</td>
          </tr>
          <tr>
            <td>Landing Page</td>
            <td>Empresa XYZ</td>
            <td>Pendiente</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
