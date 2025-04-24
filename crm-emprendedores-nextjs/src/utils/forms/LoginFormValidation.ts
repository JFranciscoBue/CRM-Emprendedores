import ILoginForm from "@/interfaces/loginForm";

const loginFormValidation = (
  formData: ILoginForm
): { [key: string]: string } => {
  const { email, password } = formData;
  const errors: { [key: string]: string } = {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !password) errors.fields = "Completa todos los campos";

  if (!emailRegex.test(email))
    errors.email = "Formato de Correo Electronico invalido";

  return errors;
};

export default loginFormValidation;
