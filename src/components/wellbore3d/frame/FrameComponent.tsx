import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../components.module.sass";
import { ScreenCapture } from "../../ui/ScreenCapture";

interface Props {
  onCloseButton: () => void;
}

export const FrameComponent = ({ onCloseButton }: Props) => {
  const handleScreenCapture = (screenCapture: string) => {
    return null;
  };
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.frame}>
        <div className={styles.closeButton}>
          <IconButton onClick={onCloseButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ width: "100%" }}>
          <ScreenCapture onEndCapture={handleScreenCapture}>
            {({ onStartCapture }: { onStartCapture: any }) => (
              <div>
                <button onClick={onStartCapture}>Capture</button>
                <iframe
                  src="https://3dwellbore.com/"
                  title="3dwellbore"
                  width={"90%"}
                  height={"700px"}
                ></iframe>
              </div>
            )}
          </ScreenCapture>
        </div>
      </div>
    </>
  );
};
