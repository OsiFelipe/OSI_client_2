import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import readXlsxFile from "read-excel-file";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

export const InputExcelFile = ({
  onReadExcelData,
  onGetImage,
  onRemoveImage,
  disabled,
}: {
  onReadExcelData: (rows: any) => void;
  onGetImage: () => void;
  onRemoveImage: () => void;
  disabled: boolean;
}) => {
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let input = event.target.files[0];
      readXlsxFile(input)
        .then((rows) => {
          if (rows.length > 0) {
            onReadExcelData(rows);
          } else throw Error;
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div style={{ alignSelf: "center", marginBottom: "1rem" }}>
      <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onRemoveImage}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
          Remove
        </Button>
        <Button variant="outlined" color="primary" component="label">
          <FileOpenIcon fontSize="small" />
          Upload Data
          <input
            hidden
            id="upload"
            multiple
            type="file"
            name="files[]"
            onChange={handleChangeFile}
          />
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onGetImage}
          disabled={disabled}
        >
          <SaveIcon fontSize="small" />
          Save Chart
        </Button>
      </ButtonGroup>
    </div>
  );
};
