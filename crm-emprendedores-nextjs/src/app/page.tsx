"use client";
import "./page.css";
import Link from "next/link";
import React, { useState } from "react";
import ILoginForm from "@/interfaces/loginForm";
import loginFormValidation from "@/utils/forms/LoginFormValidation";

const initialValue: ILoginForm = {
  email: "",
  password: "",
};

const errorsInitialValue: { [key: string]: string } = {};

export default function Home() {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(errorsInitialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const validations = loginFormValidation(formData);

    if (Object.keys(validations).length > 0) {
      alert("Formulario con errores");
      setErrors(validations as { [key: string]: string });
      return;
    }

    setErrors(errorsInitialValue);
    alert("Formulario Enviado");

    setFormData(initialValue);
  };

  return (
    <form className="loginForm" onSubmit={handleFormSubmit}>
      <h2>Inicia Sesion</h2>
      {errors.fields && <p>{errors.fields}</p>}
      <div className="loginForm__field">
        <label htmlFor="email">Correo Electronico</label>
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          onChange={handleInputChange}
          value={formData.email}
          name="email"
        />
      </div>
      <div className="loginForm__field">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
        />
      </div>
      <div className="loginForm__field">
        <input type="submit" value="INICIAR SESION" id="formSubmitButton" />
      </div>
      <div className="loginForm__registerButton">
        <Link href="/register">Registrate</Link>
      </div>
    </form>
  );
}
