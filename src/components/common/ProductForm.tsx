import {
  Button,
  TextField,
  SelectChangeEvent,
  Grid,
  Autocomplete,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { initial_tool_state } from "../../utils/data";
import styles from "../components.module.sass";
import { TitleComponent } from "../ui/TitleComponent";
import { ProductProps } from "../../interfaces/interfaces";

interface Props {
  productValues?: ProductProps;
  onEdit?: (values: ProductProps) => void;
  onCreatetool?: (values: ProductProps) => void;
  onRemoveInnerTool?: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

const diameterOptions = [
  '2-3/8" EUE box',
  '2-3/8" EUE pin',
  '2-7/8" EUE box',
  '2-7/8" EUE pin',
  '3-1/2" EUE box',
  '3-1/2" EUE pin',
  '4-1/2" EUE box',
  '4-1/2" EUE pin',
  "-",
];

export const ProductForm = ({
  productValues,
  onEdit,
  onCreatetool,
  onRemoveInnerTool,
  onCancel,
  disabled,
}: Props) => {
  const [values, setValues] = useState(productValues || initial_tool_state);
  const [toSave, setToSave] = useState(false);

  useEffect(() => {
    if (values.name !== "" && values.length !== 0 && values.quantity !== 0)
      setToSave(true);
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

  return (
    <div className={styles.customToolForm}>
      <TitleComponent title="OSI Tool" />
      <Grid container spacing={2}>
        {onCreatetool && (
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Part Number"
              variant="outlined"
              name="partNumber"
              sx={{ width: 500 }}
              value={values.partNumber}
              onChange={onChangeValue}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Description"
            variant="outlined"
            name="name"
            sx={{ width: 300 }}
            value={values.name}
            disabled={disabled}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            value={values.topThreadConnection}
            onChange={(_, newValue) =>
              newValue &&
              setValues((prev) => {
                return { ...prev, topThreadConnection: newValue };
              })
            }
            {...{
              options: diameterOptions,
            }}
            disablePortal
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Top Thread Connection" />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            value={values.bottomThreadConnection}
            onChange={(_, newValue) =>
              newValue &&
              setValues((prev) => {
                return { ...prev, bottomThreadConnection: newValue };
              })
            }
            {...{
              options: diameterOptions,
            }}
            disablePortal
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Bottom Thread Connection" />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Max OD (in)"
            name="maxOD"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.maxOD}
            disabled={disabled}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Body OD (in)"
            name="bodyOD"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.bodyOD}
            disabled={disabled}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Length (ft)"
            name="length"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.length}
            disabled={disabled}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Weight (Lb)"
            name="weight"
            variant="outlined"
            sx={{ width: 300 }}
            value={values.weight}
            disabled={disabled}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      <div className={styles.buttonGral}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        {onEdit && (
          <Button
            onClick={() => onEdit(values)}
            variant="contained"
            disabled={!toSave || disabled}
          >
            Edit
          </Button>
        )}
        {onCreatetool && (
          <Button
            onClick={() => onCreatetool(values)}
            variant="contained"
            disabled={!toSave || disabled}
          >
            Add
          </Button>
        )}
        {disabled && onRemoveInnerTool && (
          <Button onClick={() => onRemoveInnerTool()} variant="outlined">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
