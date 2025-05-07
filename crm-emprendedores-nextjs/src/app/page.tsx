"use client";
import "./page.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import ILoginForm from "@/interfaces/loginForm";
import loginFormValidation from "@/utils/forms/LoginFormValidation";
import { loginRequest } from "../utils/api/axiosFetch";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const initialValue: ILoginForm = {
  email: "",
  password: "",
};

const errorsInitialValue: { [key: string]: string } = {};

export default function Home() {
  const [formData, setFormData] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(errorsInitialValue);

  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
      setFormErrors(validations as { [key: string]: string });
      return;
    }

    setFormErrors(errorsInitialValue);

    loginRequest(formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <form className="loginForm" onSubmit={handleFormSubmit}>
      <h2>Inicia Sesion</h2>
      {formErrors.fields && <p>{formErrors.fields}</p>}
      <div className="loginForm__field">
        <label htmlFor="email">Correo Electronico</label>
        {formErrors.email && <p>{formErrors.email}</p>}
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
      <ToastContainer />
    </form>
  );
}
