import React from "react";
import {
  AlertComponent,
  LoginClientComponent,
  ShowContent,
} from "../../components";
import styles from "../main.module.sass";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export const LoginClient = () => {
  const { onLogin, isLoading, isSuccess, isError } = useContext(AuthContext);
  let content: JSX.Element | JSX.Element[];
  content = (
    <>
      <div className={styles.loginForm}>
        <LoginClientComponent onClickLogin={onLogin} />
      </div>
      {isSuccess && <AlertComponent type="success" />}
      {isError && (
        <AlertComponent
          type="error"
          message={"Not Authorized, please contact the Administrator"}
        />
      )}
    </>
  );

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
