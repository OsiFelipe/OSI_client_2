import styles from "./navigation.module.sass";
import osiLogo from "../utils/images/OSI.png";
import { Typography } from "@mui/material";
import { NavigationItems } from "./NavigationItems";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn && (
        <nav className={styles["nav-bar"]}>
          <img src={osiLogo} alt="OSI logo" />
          <NavigationItems />
          <Typography
            variant="caption"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                color: "white",
                position: "fixed",
                bottom: 1,
                left: 1,
              },
            }}
          >
            Copyright © 2023 OSI
          </Typography>
        </nav>
      )}
    </>
  );
};
