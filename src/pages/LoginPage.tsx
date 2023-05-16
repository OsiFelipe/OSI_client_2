import React from "react";
import { LoginForm } from "../components";
import styles from "./main.module.sass";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const LoginPage = () => {
  const { onLogin } = useContext(AuthContext);
  return (
    <div className={styles.center}>
      <LoginForm onClickLogin={onLogin} />
    </div>
  );
};
