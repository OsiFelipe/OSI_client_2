import { styled } from "@mui/material/styles";
import styles from "./layout.module.sass";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
interface Props {
  children: JSX.Element | JSX.Element[];
}

const drawerWidth = 250;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const SubLayout = ({ children }: Props) => {
  const { isDrawerOpen, desktop } = useContext(AuthContext);
  return (
    <Main
      className={styles.subLayout}
      open={!isDrawerOpen}
      style={{
        marginLeft: !desktop ? "60px" : !isDrawerOpen ? "60px" : "250px",
      }}
    >
      {children}
    </Main>
  );
};
