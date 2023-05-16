import styles from "./layout.module.sass";
import backgroundImage from "../../utils/images/background.jpg";
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const Layout = ({ children }: Props) => {
  return (
    <div
      className={styles.layout}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};
