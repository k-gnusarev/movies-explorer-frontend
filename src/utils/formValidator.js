import { useState } from "react";

export function validateForm() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues
  };
};