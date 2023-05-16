import styles from "./layout.module.sass";
import image from "../../utils/images/background.jpg";

export const UnderConstruction = () => {
  return <img className={styles.image} src={image} alt="Under Construction" />;
};
