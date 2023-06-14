import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuMobileBar from "./MenuMobileBar";

interface ButtonProps {
  title: string;
  action: () => void;
  icon: JSX.Element;
  disabled?: Boolean;
}

interface Props {
  buttons: ButtonProps[];
  title: string;
}

export function MobileBar({ title, buttons }: Props) {
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "rgba(90,100,119,0.8)" }}
    >
      <Toolbar>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <MenuMobileBar buttons={buttons} />
      </Toolbar>
    </AppBar>
  );
}
