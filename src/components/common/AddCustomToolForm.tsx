import {
  Button,
  TextField,
  SelectChangeEvent,
  Autocomplete,
  Grid,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { initial_tool_state } from "../../utils/data";
import styles from "../components.module.sass";
import { TitleComponent } from "../ui/TitleComponent";
import { ProductProps } from "../../interfaces/interfaces";

interface Props {
  toolValues?: ProductProps;
  onAddCustomTool?: (values: any) => void;
  onEditCustomTool?: (values: any) => void;
  onCancel: () => void;
}

const options = [
  { id: 0, name: "NEW" },
  { id: 1, name: "USED" },
];

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

export const AddCustomToolForm = ({
  onAddCustomTool,
  onEditCustomTool,
  toolValues,
  onCancel,
}: Props) => {
  const [values, setValues] = useState(toolValues || initial_tool_state);
  const [toSave, setToSave] = useState(false);
  const [tailJoint, setTailJoint] = useState("NO");

  useEffect(() => {
    if (values.tailJoint) setTailJoint("YES");
  }, []);

  useEffect(() => {
    if (
      values.description !== "" &&
      values.length &&
      values.quantity &&
      values.supplier !== ""
    )
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

  const onSelectStatus = (newValue: any) => {
    setValues((prevState) => {
      return {
        ...prevState,
        status: newValue,
      };
    });
  };

  const handleSelectMudJoint = (newValue: string) => {
    if (newValue === "YES") {
      setValues((prevState) => {
        return {
          ...prevState,
          tailJoint: true,
        };
      });
    } else {
      setValues((prevState) => {
        return {
          ...prevState,
          tailJoint: false,
        };
      });
    }
    setTailJoint(newValue);
  };

  return (
    <div className={styles.customToolForm}>
      <TitleComponent title="Custom Tool" />
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Description"
            variant="outlined"
            name="description"
            className={styles.formFieldModalCustom}
            value={values.description}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Supplier"
            name="supplier"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.supplier}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
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
            className={styles.formFieldModalCustom}
            renderInput={(params) => (
              <TextField {...params} label="Top Thread Connection" />
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
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
            className={styles.formFieldModalCustom}
            renderInput={(params) => (
              <TextField {...params} label="Bottom Thread Connection" />
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            value={values.status}
            isOptionEqualToValue={(option, value) => {
              return true;
            }}
            onChange={(_, newValue) => onSelectStatus(newValue)}
            {...{
              options: options,
              getOptionLabel: (option: { id: number; name: string }) =>
                option.name,
            }}
            disablePortal
            className={styles.formFieldModalCustom}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Max OD"
            name="maxOD"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.maxOD}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Body OD"
            name="bodyOD"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.bodyOD}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Length"
            name="length"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.length}
            onChange={(event) => {
              const inputValue = parseFloat(event.target.value);
              if (!isNaN(inputValue))
                setValues((prevState) => {
                  return {
                    ...prevState,
                    length: inputValue,
                  };
                });
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="number"
            label="QTY"
            name="quantity"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.quantity}
            onChange={(event) => {
              parseInt(event.target.value) >= 1 &&
                setValues((prevState) => {
                  return {
                    ...prevState,
                    quantity: parseInt(event.target.value),
                  };
                });
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Weight"
            name="weight"
            variant="outlined"
            className={styles.formFieldModalCustom}
            value={values.weight}
            onChange={(event) => {
              const inputValue = parseFloat(event.target.value);
              if (!isNaN(inputValue))
                setValues((prevState) => {
                  return {
                    ...prevState,
                    weight: inputValue,
                  };
                });
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            value={tailJoint}
            onChange={(_, newValue) =>
              (newValue === "YES" || newValue === "NO") &&
              handleSelectMudJoint(newValue)
            }
            {...{
              options: ["YES", "NO"],
            }}
            disablePortal
            className={styles.formFieldModalCustom}
            renderInput={(params) => (
              <TextField {...params} label="Is tail Joint" />
            )}
          />
        </Grid>
      </Grid>
      <div className={styles.buttonGral}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        {onAddCustomTool && (
          <Button
            onClick={() => onAddCustomTool(values)}
            variant="contained"
            disabled={!toSave}
          >
            Add
          </Button>
        )}
        {onEditCustomTool && (
          <Button
            onClick={() => onEditCustomTool(values)}
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
