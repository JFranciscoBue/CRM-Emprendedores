import "./sidebar.css";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Sidebar__head">
        <h1>Mini CRM</h1>
      </div>
      <div className="Sidebar__navigation">
        <ul className="Sidebar__navigation-list">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/clients">Clientes</Link>
          </li>
          <li>
            <Link href="/profile">Mi Perfil</Link>
          </li>
          <li>
            <Link href="/">Cerrar Sesion</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
