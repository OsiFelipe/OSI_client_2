import { Button } from "@mui/material";
import { Modal } from "../ui/Modal";

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
          <div>
            {onAccept && <Button onClick={onCancel}>Cancel</Button>}
            {onCancel && <Button onClick={onAccept}>Accept</Button>}
          </div>
        </>
      }
    />
  );
};
