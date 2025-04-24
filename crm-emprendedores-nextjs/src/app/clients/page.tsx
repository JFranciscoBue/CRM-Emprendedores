import "./clientsPage.css";
import Sidebar from "@/components/sidebar/page";

const ClientsPage = () => {
  return (
    <>
      <Sidebar />
      <div className="clientsPageContainer">
        <div className="clientsPageContainer__header">
          <h2>Mis Clientes</h2>
          <button>Añadir Nuevo Cliente</button>
        </div>
        <div className="table-scroll">
          <table className="clientsPageContainer__table-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Número de Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Francisco</td>
                <td>juancho@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
              <tr>
                <td>Maria Julia</td>
                <td>maria@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
              <tr>
                <td>Mario Bross</td>
                <td>marito@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
              <tr>
                <td>Papa Francisco</td>
                <td>franciscus@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
              <tr>
                <td>Domingo Peron</td>
                <td>peroncito@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
              <tr>
                <td>Gabigol</td>
                <td>gabigol@gmail.com</td>
                <td>+5493413232826</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClientsPage;
