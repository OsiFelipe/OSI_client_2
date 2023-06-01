import React from "react";
import styles from "../components.module.sass";
import { useState } from "react";

export const LoginForm = ({
  onClickLogin,
}: {
  onClickLogin: (username: string, pass: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  return (
    <form
      className={styles.wrapper}
      onSubmit={(event) => {
        event.preventDefault();
        onClickLogin(username, pass);
      }}
    >
      <h2>LOGIN</h2>
      <section className={styles.group}>
        <input
          type="text"
          className={styles.input}
          name="email"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
      </section>
      <section className={styles.group}>
        <input
          type="password"
          minLength={8}
          value={pass}
          className={styles.input}
          name="password"
          onChange={(event) => setPass(event.target.value)}
          required
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
      </section>
      <button type="submit" className={styles.button}>
        LOGIN
      </button>
      <span className={styles.footer}></span>
    </form>
  );
};
