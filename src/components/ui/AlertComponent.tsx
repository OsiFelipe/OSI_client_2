import { Alert } from "@mui/material";
import React from "react";
import styles from "./ui.module.sass";

export const AlertComponent = ({ type }: { type: "success" | "error" }) => {
  let content =
    type === "success" ? "Saved Successfully" : "An error has ocurred";
  return (
    <div className={styles.alert}>
      <Alert variant="filled" severity={type}>
        {content}
      </Alert>
    </div>
  );
};
