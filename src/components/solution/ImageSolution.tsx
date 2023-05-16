import { Grid } from "@mui/material";
import React from "react";
import { SolutionProps } from "../../interfaces/interfaces";
import Button from "@mui/material/Button";
import styles from "../components.module.sass";

interface Props {
  solution: SolutionProps;
  onUploadImage?: (item: string, img: string | ArrayBuffer | null) => void;
}

export const ImageSolution = ({ solution, onUploadImage }: Props) => {
  const handleUploadImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        reader.result && onUploadImage && onUploadImage(item, reader.result);
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            component="label"
            disabled={!solution.sandSolution}
          >
            Upload Sand Simulator
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => handleUploadImage(event, "sandImage")}
            />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            component="label"
            disabled={!solution.gasSolution}
          >
            Upload Gas Simulator
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => handleUploadImage(event, "gasImage")}
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
