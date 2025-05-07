"use client";

import "./projectsPage.css";
import Sidebar from "@/components/sidebar/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserData from "@/interfaces/userData";
import {
  changeEmailRequest,
  changePasswordRequest,
} from "../../utils/api/axiosFetch";
import { toast, ToastContainer } from "react-toastify";

const ProjectsPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/");
    } else {
      const user: UserData = JSON.parse(storedUser);
      setUserData(user);
    }
  }, []);

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token || !userData) return;

    try {
      await changePasswordRequest(userData._id, newPassword, token);
      alert("Contraseña actualizada");
      setShowPasswordModal(false);
      setNewPassword("");
      toast.success("Contraseña Cambiada Correctamente");
    } catch (err) {
      alert("Error al cambiar la contraseña");
    }
  };

  const handleChangeEmail = async () => {
    const token = localStorage.getItem("token");
    if (!token || !userData) return;

    try {
      await changeEmailRequest(userData._id, newEmail, token);
      alert("Correo actualizado");
      const updatedUser = { ...userData, email: newEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setShowEmailModal(false);
      setNewEmail("");
    } catch (err) {
      alert("Error al cambiar el correo");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="profileContainer">
        <div className="profileContainer__top">
          <img
            src={
              userData?.imgProfile ||
              "https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk="
            }
            alt="Foto de Perfil"
          />
          {userData?.imgProfile ? (
            <button id="changeImgProfileButton">Editar Foto de Perfil</button>
          ) : (
            <button id="changeImgProfileButton">Agregar Foto de Perfil</button>
          )}
          <h2>{userData?.fullname}</h2>
          <p>Emprendedor</p>
        </div>
        <div className="profileContainer__contactInfo">
          <h3>Informacion de Contacto</h3>
          <p>{userData?.email}</p>
          <p>{userData?.phone}</p>
        </div>
        <div className="profileContainer__buttons">
          <button onClick={() => setShowPasswordModal(true)}>
            Cambiar Contraseña
          </button>
          <button onClick={() => setShowEmailModal(true)}>
            Cambiar Correo
          </button>
          <button>Eliminar Cuenta</button>
        </div>
      </div>

      {/* MODAL CAMBIAR CONTRASEÑA */}
      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nueva Contraseña</h3>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleChangePassword}>Confirmar</button>
              <button onClick={() => setShowPasswordModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CAMBIAR EMAIL */}
      {showEmailModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nuevo Correo</h3>
            <input
              type="email"
              placeholder="Nuevo correo"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleChangeEmail}>Confirmar</button>
              <button onClick={() => setShowEmailModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ProjectsPage;
