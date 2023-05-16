import styles from "../components.module.sass";
import image from "../../utils/images/OSI.png";
import { WbdItemProps } from "../../interfaces/interfaces";

interface Props {
  item: WbdItemProps;
}

export const ImageWbd = ({ item }: Props) => {
  return (
    <img
      className={styles.image}
      src={
        item.tool.imagePath
          ? `${process.env.REACT_APP_SERVER}${item.tool.imagePath}`
          : image
      }
      alt={item.tool.name}
    />
  );
};
