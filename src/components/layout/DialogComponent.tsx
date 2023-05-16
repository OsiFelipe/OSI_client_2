import { Button } from "@mui/material";
import { Modal } from "../ui/Modal";
import styles from "./layout.module.sass";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  type?: "error" | "success" | "warning";
  modalContent: JSX.Element | JSX.Element[];
  onAccept?: () => void;
  onCancel?: () => void;
}

export const DialogComponent = ({
  type,
  modalContent,
  onAccept,
  onCancel,
}: Props) => {
  const icon =
    type === "error" ? (
      <ErrorOutlineIcon
        sx={{ color: "#CD1719", fontSize: "6rem", marginTop: "1rem" }}
      />
    ) : type === "warning" ? (
      <WarningAmberIcon
        sx={{ color: "#E9D502", fontSize: "6rem", marginTop: "1rem" }}
      />
    ) : (
      <CheckCircleOutlineIcon
        sx={{ color: "#4BB543", fontSize: "6rem", marginTop: "1rem" }}
      />
    );
  return (
    <Modal
      children={
        <>
          {icon && icon}
          <div className={styles.alertModal}>{modalContent}</div>
          <div className={styles.buttonsAlertModal}>
            {onAccept && (
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
            )}
            {onCancel && (
              <Button variant="contained" onClick={onAccept}>
                Accept
              </Button>
            )}
          </div>
        </>
      }
    />
  );
};
