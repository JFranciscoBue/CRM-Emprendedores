"use client";

import "./clientDetailsPage.css";
import Sidebar from "@/components/sidebar/page";
import ProjectsTable from "@/components/projectsTable/page";
import { use, useEffect, useState } from "react";
import { getClient, addProject } from "../../../utils/api/axiosFetch";
import * as Dialog from "@radix-ui/react-dialog";
import { toast, ToastContainer } from "react-toastify";
import ProjectForm from "@/interfaces/projectsForm";
import ClientDetails from "@/interfaces/clientDetails";
import { useRouter } from "next/navigation";

const ClientDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(
    null
  );
  const [projectFormData, setProjectFormData] = useState<ProjectForm>({
    title: "",
    status: "",
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProjectFormData({ ...projectFormData, [name]: value });
  };

  const handleButton = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const user = JSON.parse(localStorage.getItem("user")!);

      await addProject(
        {
          ...projectFormData,
          clientId: clientDetails?._id,
          userId: user._id,
        },
        token
      ).then(() => {
        getClient(id, token)
          .then((res) => {
            setClientDetails(res.data.clientFound);
            toast.success("Proyecto añadido Correctamente");
          })
          .catch((err) => console.error(err));
      });

      setProjectFormData({
        title: "",
        status: "",
      });
    } catch (error: any) {
      console.error(error.response.data.errors);
      const errors = error.response.data.errors;

      const firstError =
        errors.fields ||
        errors.title ||
        "Ha habido un problema. Intentalo de nuevo";

      toast.error(firstError);
    }
  };

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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="addProjectButton">Nuevo Proyecto</button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialogOverlay" />
              <Dialog.Content className="dialogContent">
                <Dialog.Title className="dialogTitle">
                  Nuevo Proyecto
                </Dialog.Title>
                <Dialog.Description className="dialogDescription">
                  Completa los datos
                </Dialog.Description>

                <form>
                  <div>
                    <label htmlFor="title">Nombre</label>
                    <input
                      type="text"
                      name="title"
                      value={projectFormData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="status">Estado</label>
                    <input
                      type="text"
                      name="status"
                      value={projectFormData.status}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>

                <Dialog.Close asChild>
                  <button className="closeModalButton" onClick={handleButton}>
                    Añadir
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {clientDetails ? (
            <ProjectsTable
              projects={clientDetails.projects.map((project) => ({
                ...project,
                client: clientDetails.name,
              }))}
            />
          ) : (
            <p>Cargando proyectos...</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ClientDetailsPage;
