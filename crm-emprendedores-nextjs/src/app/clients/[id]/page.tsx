import "./clientDetailsPage.css";
import Sidebar from "@/components/sidebar/page";
import ProjectsTable from "@/components/projectsTable/page";

const ClientDetailsPage = () => {
  return (
    <>
      <Sidebar />
      <div className="detailsContainer">
        <div className="detailsContainer__title">
          <h2>Detalles del Cliente</h2>
        </div>
        <div className="detailsContainer__info">
          <table className="info-table">
            <tbody>
              <tr>
                <td className="label">Name</td>
                <td className="value">John Doe</td>
              </tr>
              <tr>
                <td className="label">Email</td>
                <td className="value">john@example.com</td>
              </tr>
              <tr>
                <td className="label">Phone</td>
                <td className="value">+1234567890</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="detailsContainer__projects">
          <h2>Proyectos</h2>
          <ProjectsTable />
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
