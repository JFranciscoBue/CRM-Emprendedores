"use client";

import "./projectsPage.css";
import Sidebar from "@/components/sidebar/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  fullname: string;
  email: string;
  phone: string;
  imgProfile: string;
}

const ProjectsPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
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
          <button>Cambiar Contraseña</button>
          <button>Cambiar Correo</button>
          <button>Eliminar Cuenta</button>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
