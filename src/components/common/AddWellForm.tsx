import {
  Button,
  TextField,
  SelectChangeEvent,
  Grid,
  Autocomplete,
} from "@mui/material";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import styles from "../components.module.sass";
import { ClientProps, WellProps } from "../../interfaces/interfaces";
import { TitleComponent } from "../ui/TitleComponent";
import DataContext from "../../context/DataContext";

interface Props {
  data?: WellProps;
  client?: ClientProps;
  onEditWell?: (values: WellProps) => void;
  onAddWell?: (values: WellProps) => void;
  onCancel: () => void;
}

const initial_form_state = {
  client: { id: 0, name: "" },
  name: "",
  contact: "",
  phoneNumber: "",
};

export const AddWellForm = ({
  data,
  client,
  onAddWell,
  onEditWell,
  onCancel,
}: Props) => {
  const [values, setValues] = useState(
    data || { ...initial_form_state, client }
  );
  const [toSave, setToSave] = useState(false);
  const { clientOptions } = useContext(DataContext);
  useEffect(() => {
    if (values.name !== "") setToSave(true);
  }, [values]);

  const onChangeValue = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>
  ) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onChangeClient = (newClient: ClientProps) => {
    setValues((prevState) => {
      return {
        ...prevState,
        client: newClient,
      };
    });
  };

  const defaultProps = {
    options: clientOptions,
    getOptionLabel: (option: ClientProps) => option.name,
  };

  return (
    <div className={styles.customToolForm}>
      <TitleComponent title="Well Info" />
      <Grid container spacing={2}>
        {client ? (
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Client"
              variant="outlined"
              sx={{ width: 300 }}
              value={client.name}
              disabled
              onChange={onChangeValue}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <Autocomplete
              id="client-selector"
              value={values.client}
              isOptionEqualToValue={(option, value) => {
                return true;
              }}
              onChange={(_, newValue) => newValue && onChangeClient(newValue)}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              {...defaultProps}
              disablePortal
              sx={{ width: "20vw" }}
              renderInput={(params) => <TextField {...params} label="Client" />}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Well Name"
            name="name"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.name}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Contact Name"
            variant="outlined"
            name="contact"
            sx={{ width: 300 }}
            value={values.contact}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.phoneNumber}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      <div className={styles.buttonGral}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        {onAddWell && (
          <Button
            onClick={() => onAddWell(values)}
            variant="contained"
            disabled={!toSave}
          >
            Add
          </Button>
        )}
        {onEditWell && (
          <Button
            onClick={() => onEditWell(values)}
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
