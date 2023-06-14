import { Button } from "@mui/material";
import { Modal } from "../ui/Modal";
import styles from "./layout.module.sass";

interface Props {
  modalContent: JSX.Element | JSX.Element[];
  onAccept?: () => void;
  onCancel?: () => void;
}

export const ModalComponent = ({ modalContent, onAccept, onCancel }: Props) => {
  return (
    <Modal
      children={
        <>
          <div>{modalContent}</div>
          <div className={styles.modalButtons}>
            {onAccept && <Button onClick={onCancel}>Cancel</Button>}
            {onCancel && <Button onClick={onAccept}>Accept</Button>}
          </div>
        </>
      }
    />
  );
};
