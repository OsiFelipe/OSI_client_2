import styles from "../components.module.sass";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.iconErrorMessage}>
        <ErrorOutlineIcon fontSize="large" />
      </div>
      <div className={styles.errorMessage}>
        SERVER ERROR - <span>Please try again later</span>
      </div>
    </div>
  );
};
