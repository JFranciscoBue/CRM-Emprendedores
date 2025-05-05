"use client";
import "./registerFormPage.css";
import { useState } from "react";
import RegisterForm from "@/interfaces/registerForm";
import { registerRequest } from "../../utils/api/axiosFetch";

const RegisterFormPage = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerRequest(formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="registerForm" onSubmit={handleFormSubmit}>
      <h2>Crea tu cuenta ahora</h2>
      <div className="registerForm__field">
        <label htmlFor="fullname">Nombre Completo</label>
        <input
          type="text"
          name="fullname"
          onChange={handleChange}
          value={formData.fullname}
        />
      </div>
      <div className="registerForm__field">
        <label htmlFor="email">Correo Electronico</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="registerForm__field">
        <label htmlFor="phone">Numero de Telefono</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
      </div>
      <div className="registerForm__field">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <div className="registerForm__field">
        <input type="submit" value="Registrarse" id="formSubmitButton" />
      </div>
    </form>
  );
};

export default RegisterFormPage;
