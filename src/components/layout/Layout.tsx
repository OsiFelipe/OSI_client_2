import styles from "./layout.module.sass";
import backgroundImage from "../../utils/images/background.jpg";
import { useLocation } from "react-router-dom";
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const Layout = ({ children }: Props) => {
  let location = useLocation();
  let isLoginPage = !!(location.pathname === "/");
  return (
    <div
      className={styles.layout}
      style={
        isLoginPage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};
