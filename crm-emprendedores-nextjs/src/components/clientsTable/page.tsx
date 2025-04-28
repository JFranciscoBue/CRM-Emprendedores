import Link from "next/link";
import "./clientsTable.css";

interface IClients {
  clients: {
    name: string;
    email: string;
    phone: string;
    _id: string;
  }[];
  onSort: (field: "name" | "email" | "phone") => void;
  currentSortField: "name" | "email" | "phone";
  currentSortOrder: "asc" | "desc";
}

const ClientsTable = ({
  clients,
  onSort,
  currentSortField,
  currentSortOrder,
}: IClients) => {
  const renderArrow = (field: "name" | "email" | "phone") => {
    if (currentSortField !== field) return null;
    return currentSortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="table-scroll">
      <table className="clientsPageContainer__table-table">
        <thead>
          <tr>
            <th onClick={() => onSort("name")}>Nombre{renderArrow("name")}</th>
            <th onClick={() => onSort("email")}>
              Correo Electrónico{renderArrow("email")}
            </th>
            <th onClick={() => onSort("phone")}>
              Número de Teléfono{renderArrow("phone")}
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>
                <Link href={`/clients/${client._id}`}>{client.name}</Link>
              </td>
              <td>
                <Link href={`/clients/${client._id}`}>{client.email}</Link>
              </td>
              <td>
                <Link href={`/clients/${client._id}`}>{client.phone}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
