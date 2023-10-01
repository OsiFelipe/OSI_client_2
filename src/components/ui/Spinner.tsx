import styles from "./ui.module.sass";

export const Spinner = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  );
};
