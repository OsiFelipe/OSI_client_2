import styles from "./ui.module.sass";

export const TitleComponent = ({ title }: { title: string }) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.line} />

      <div className={styles.title}>{title}</div>

      <div className={styles.line} />
    </div>
  );
};
