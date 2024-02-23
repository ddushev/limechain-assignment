import { useState } from "react";

export default function useForm(initialValues: { [key: string]: string }) {
  const [values, setValues] = useState(initialValues);
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  return {
    values,
    onChangeHandler,
  };
}
