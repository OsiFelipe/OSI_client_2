import styles from "./ui.module.sass";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Modal = ({ children }: Props) => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>{children}</div>
    </>
  );
};
