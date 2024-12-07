import { useState } from "react";

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => ValidationErrors;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends object>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};
