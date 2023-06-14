import styles from "./layout.module.sass";
import backgroundImage from "../../utils/images/01.jpg";
import backgroundImageMobile from "../../utils/images/Mobile.jpg";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const Layout = ({ children }: Props) => {
  let location = useLocation();
  let isLoginPage = !!(location.pathname === "/");
  const matches = useMediaQuery("(min-width:600px)");
  const bgImage = matches ? backgroundImage : backgroundImageMobile;
  return (
    <div
      className={styles.layout}
      style={
        isLoginPage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};
