import styles from "../components.module.sass";
import { useContext, useRef } from "react";
import DataContext from "../../context/DataContext";
import { Button, ButtonGroup } from "@mui/material";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ImageIcon from "@mui/icons-material/Image";
import { useScreenshot } from "usescreenshot-react";
import DeleteIcon from "@mui/icons-material/Delete";

export const Wellbore3d = () => {
  const { takeScreenshot } = useScreenshot();
  const ref = useRef<HTMLIFrameElement>(null);
  const {
    onChangeW3d,
    data: { wellbore3dImg },
  } = useContext(DataContext);

  const getImage = () => {
    if (!ref.current) {
      return;
    }
    takeScreenshot(ref.current, {
      backgroundColor: null,
      logging: false,
    })
      .then((res) => console.log(res))
      .catch(console.log);
  };
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        reader.result &&
          typeof reader.result === "string" &&
          onChangeW3d(reader.result);
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  };

  return (
    <div className={styles.wellbore3d}>
      <div>
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              onChangeW3d("");
            }}
            disabled={!wellbore3dImg}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Remove
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.open("https://3dwellbore.com/", "_blank")}
          >
            <ThreeDRotationIcon fontSize="small" sx={{ mr: 1 }} />
            3D Wellbore
          </Button>
          <Button variant="outlined" color="primary" component="label">
            <ImageIcon fontSize="small" sx={{ mr: 1 }} />
            Upload Image
            <input
              id="input-image"
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => {
                handleUploadImage(event);
                event.target.files = null;
              }}
            />
          </Button>
        </ButtonGroup>
        <div>
          <div className={styles.center}>
            {wellbore3dImg ? (
              <img src={wellbore3dImg} alt="wellbore 3d" />
            ) : (
              <iframe
                ref={ref}
                src="https://3dwellbore.com/"
                title="3dwellbore"
                width={"90%"}
                height={"700px"}
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
