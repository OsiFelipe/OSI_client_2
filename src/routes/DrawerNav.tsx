import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavigationList } from "./NavigationList";
import { useContext } from "react";
import { Typography } from "@mui/material";
import osiLogo from "../utils/images/OSI.png";
import AuthContext from "../context/AuthContext";
import styles from "./navigation.module.sass";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function DrawerNav() {
  const { isDrawerOpen, onMoveDrawer, desktop } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#5a6477" }}>
      <Drawer variant="permanent" open={isDrawerOpen} className={styles.navBar}>
        <DrawerHeader
          style={
            isDrawerOpen
              ? {
                  display: "flex",
                  flexDirection: "row",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                }
          }
        >
          <img src={osiLogo} alt="OSI logo" style={{ width: "60%" }} />
          <IconButton
            onClick={() => {
              onMoveDrawer(!isDrawerOpen);
            }}
          >
            {!isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavigationList
          onCloseMenu={
            !desktop
              ? () => {
                  onMoveDrawer(false);
                }
              : () => {}
          }
        />
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
      </Drawer>
    </Box>
  );
}
