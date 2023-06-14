import { TextField, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../components.module.sass";
import { TitleComponent } from "../ui/TitleComponent";

interface Props {
  value?: string | null;
  onAddClient?: (name: string) => void;
  onEditClient?: (name: string) => void;
  onCancel: () => void;
}

export const AddClientForm = ({
  value,
  onAddClient,
  onEditClient,
  onCancel,
}: Props) => {
  const [clientName, setClientName] = useState(value || "");
  const [toSave, setToSave] = useState(false);

  useEffect(() => {
    if (clientName !== "") setToSave(true);
  }, [clientName]);

  return (
    <div className={styles.customToolForm}>
      <TitleComponent title="Client" />
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Name"
            variant="outlined"
            name="name"
            className={styles.formFieldModal}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
          />
        </Grid>
      </Grid>
      <div className={styles.buttonForm}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        {onAddClient && (
          <Button
            onClick={() => onAddClient(clientName)}
            variant="contained"
            disabled={!toSave}
          >
            Add
          </Button>
        )}
        {onEditClient && (
          <Button
            onClick={() => onEditClient(clientName)}
            variant="contained"
            disabled={!toSave}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};
