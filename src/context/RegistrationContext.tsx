import {
  createContext,
  useContext,
  useState,
} from "react";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationContextType {
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;

  errors: RegistrationErrors;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrors>>;

  resetForm: () => void;
}

const RegistrationContext =
  createContext<RegistrationContextType | null>(null);

export const RegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] =
    useState(initialForm);

  const [errors, setErrors] =
    useState(initialErrors);

  const resetForm = () => {
    setFormData(initialForm);
    setErrors(initialErrors);
  };

  return (
    <RegistrationContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        resetForm,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistration must be used inside RegistrationProvider"
    );
  }

  return context;
};