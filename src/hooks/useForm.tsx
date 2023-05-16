import { ChangeEvent, FormEvent, useState } from "react";

export function useForm<T>(initialState: T) {
  const [values, setValue] = useState(initialState);

  const onChangeValue = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmitForm = (
    event: FormEvent<HTMLFormElement>,
    next: (values: T) => void
  ) => {
    //Add validation to inputs
    event.preventDefault();
    next(values);
  };

  return {
    values,
    onChangeValue,
    onSubmitForm,
  };
}
