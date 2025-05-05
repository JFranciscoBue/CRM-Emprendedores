import ILoginForm from "@/interfaces/loginForm";
import IClientForm from "@/interfaces/clientForm";
import ProjectForm from "@/interfaces/projectsForm";
import RegisterForm from "@/interfaces/registerForm";
import axios from "axios";

const API = "http://localhost:4000";

export const registerRequest = (formData: RegisterForm) => {
  const response = axios.post(`${API}/auth/register`, formData);
  return response;
};

export const loginRequest = async (formData: ILoginForm) => {
  const response = await axios.post(`${API}/auth/login`, formData);
  return response;
};

export const clientsRequest = async (id: string, token: string) => {
  const response = await axios.get(`${API}/clients/getByUser/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) throw new Error();

  return response;
};

export const projectsRequest = async (id: string, token: string) => {
  const response = await axios.get(`${API}/projects/userProjects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) throw new Error();

  return response;
};

export const addClient = async (clientData: IClientForm, token: string) => {
  const response = await axios.post(`${API}/clients`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const addProject = async (data: ProjectForm, token: string) => {
  const response = await axios.post(`${API}/projects`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getClient = async (id: string, token: string) => {
  const response = await axios.get(`${API}/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
