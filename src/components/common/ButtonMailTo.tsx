import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ButtonMailto = ({
  mailto,
  label,
}: {
  mailto: any;
  label: any;
}) => {
  return (
    <Button
      variant="outlined"
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Button>
  );
};
