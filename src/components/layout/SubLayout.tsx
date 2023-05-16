import styles from "./layout.module.sass";
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const SubLayout = ({ children }: Props) => {
  return <div className={styles.subLayout}>{children}</div>;
};
