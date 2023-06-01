import { Alert } from "@mui/material";
import React from "react";
import styles from "./ui.module.sass";

export const AlertComponent = ({
  type,
  message,
}: {
  type: "success" | "error";
  message?: string;
}) => {
  let content =
    type === "success" ? "Saved Successfully" : "An error has ocurred";
  return (
    <div className={styles.alert}>
      <Alert variant="filled" severity={type}>
        {message || content}
      </Alert>
    </div>
  );
};
