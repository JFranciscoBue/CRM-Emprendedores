"use client";

import "./clientsPage.css";
import Sidebar from "@/components/sidebar/page";
import ClientsTable from "@/components/clientsTable/page";
import { clientsRequest, addClient } from "@/utils/api/axiosFetch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Client {
  name: string;
  email: string;
  phone: string;
}

interface ClientForm {
  name: string;
  email: string;
  phone: string;
}

const ClientsPage = () => {
  const [userClients, setUserClients] = useState<Client[]>([]);
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [clientFormData, setClientFormData] = useState<ClientForm>({
    name: "",
    email: "",
    phone: "",
  });
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!user || !token) {
      router.push("/");
    } else {
      clientsRequest(JSON.parse(user)._id, token)
        .then((res) => setUserClients(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const sortedClients = [...userClients].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButton = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const user = JSON.parse(localStorage.getItem("user")!);

      await addClient({ ...clientFormData, userId: user._id }, token).then(
        () => {
          toast.success("Cliente Agregado Correctamente");
          clientsRequest(user._id, token).then((res) => {
            setUserClients(res.data);
          });
        }
      );

      setClientFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error: any) {
      console.error(error.response.data.errors);
      const errors = error.response.data.errors;

      const firstError =
        errors.fields ||
        errors.name ||
        errors.email ||
        errors.phone ||
        errors.userId ||
        "Ha habido un problema. Intentalo de nuevo";

      toast.error(firstError);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="clientsPageContainer">
        <div className="clientsPageContainer__header">
          <h2>Mis Clientes</h2>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="addClientButton">Añadir Nuevo Cliente</button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialogOverlay" />
              <Dialog.Content className="dialogContent">
                <Dialog.Title className="dialogTitle">
                  Añadir Cliente
                </Dialog.Title>
                <Dialog.Description className="dialogDescription">
                  Completa los datos
                </Dialog.Description>

                <form>
                  <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={clientFormData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Correo Electronico</label>
                    <input
                      type="email"
                      name="email"
                      value={clientFormData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Numero de Telefono</label>
                    <input
                      type="text"
                      name="phone"
                      value={clientFormData.phone}
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
        </div>

        <ToastContainer />

        <ClientsTable
          clients={sortedClients}
          onSort={handleSort}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
        />
      </div>
    </>
  );
};

export default ClientsPage;
