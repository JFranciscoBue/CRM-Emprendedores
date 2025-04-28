"use client";

import "./clientDetailsPage.css";
import Sidebar from "@/components/sidebar/page";
import ProjectsTable from "@/components/projectsTable/page";
import { use, useEffect, useState } from "react";
import { getClient } from "../../../utils/api/axiosFetch";
import { useRouter } from "next/navigation";

interface Projects {
  title: string;
  client: string;
  status: string;
}

interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  projects: Projects[];
}

const ClientDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      router.push("/");
    } else {
      getClient(id, token)
        .then((res) => {
          console.log(res.data);
          setClientDetails(res.data.clientFound);
          console.log(clientDetails);
        })
        .catch((err) => console.error(err));
    }
  }, [id, router]);

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
              {clientDetails ? (
                <>
                  <tr>
                    <td className="label">Name</td>
                    <td className="value">{clientDetails.name}</td>
                  </tr>
                  <tr>
                    <td className="label">Email</td>
                    <td className="value">{clientDetails.email}</td>
                  </tr>
                  <tr>
                    <td className="label">Phone</td>
                    <td className="value">{clientDetails.phone}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={2}>Cargando...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="detailsContainer__projects">
          <h2>Proyectos</h2>
          {clientDetails ? (
            <ProjectsTable projects={clientDetails.projects} />
          ) : (
            <p>Cargando proyectos...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
