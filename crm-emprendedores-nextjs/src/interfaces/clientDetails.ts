import Projects from "./projects";

export default interface ClientDetails {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  projects: Projects[];
}
