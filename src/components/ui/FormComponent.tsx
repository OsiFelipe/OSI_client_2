import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import styles from "./ui.module.sass";

interface FieldProps {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  options?: any;
}

interface Props<T> {
  title?: string;
  fields: FieldProps[];
  initialState: T;
  submit?: { buttonName: string; func: (values: T) => void };
}

export function FormComponent<T>({
  title,
  fields,
  initialState,
  submit,
}: Props<T>) {
  const [values, setValue] = useState<T>(initialState);

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
    next(values as any);
  };
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(event) => submit && onSubmitForm(event, submit.func)}
      >
        <div className={styles.title}>{title}</div>
        {fields.map(({ id, name, type, placeholder, options }) =>
          type === "select" ? (
            <React.Fragment key={id}>
              <select onChange={onChangeValue} name={name}>
                <option value={"null"}>{placeholder}</option>
                {options.map((option: any) => (
                  <option value={option.id} key={option.id}>
                    {option.name || option.value}
                  </option>
                ))}
              </select>
            </React.Fragment>
          ) : (
            <input
              key={id}
              className={styles.input}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChangeValue}
            />
          )
        )}
        {submit && (
          <button className={styles.submitButton}>{submit.buttonName}</button>
        )}
      </form>
    </>
  );
}
