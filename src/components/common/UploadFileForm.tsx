import { Button, TextField, Grid, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../components.module.sass";
import {
  ClientProps,
  PullingReportProps,
  WellProps,
} from "../../interfaces/interfaces";
import { TitleComponent } from "../ui/TitleComponent";
import { additional_info_options } from "../../utils/data";

interface Props {
  clientOptions: ClientProps[];
  wellOptions: WellProps[];
  fetchDataWells: (idWell: number) => void;
  onCancel: () => void;
  onUploadFile: (values: PullingReportProps) => void;
}

const initial_form_state = {
  client: { id: 0, name: "" },
  well: {
    active: true,
    clientId: 0,
    contact: "",
    createdAt: "",
    id: 0,
    name: "",
    phoneNumber: "",
    updatedAt: "",
  },
  customName: "",
  file: null,
};

export const UploadFileForm = ({
  clientOptions,
  wellOptions,
  fetchDataWells,
  onCancel,
  onUploadFile,
}: Props) => {
  const [values, setValues] = useState<PullingReportProps>(initial_form_state);
  const [toSave, setToSave] = useState(false);

  useEffect(() => {
    if (values.client && values.well && values.customName && values.file)
      setToSave(true);
  }, [values]);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const pdfFile = event.target.files[0] || null;
      setValues((prevState) => {
        return {
          ...prevState,
          file: pdfFile,
        };
      });
    }
  };

  const onChangeClient = (clientSelected: ClientProps) => {
    fetchDataWells(clientSelected.id);
    setValues((prevState) => {
      return {
        ...prevState,
        client: clientSelected,
      };
    });
  };

  const onChangeWell = (wellSelected: WellProps) => {
    setValues((prevState) => {
      return {
        ...prevState,
        well: wellSelected,
      };
    });
  };

  const onChangeAdditionalInfo = (newValue: string) => {
    setValues((prevState) => {
      return {
        ...prevState,
        customName: newValue,
      };
    });
  };

  const defaultProps = {
    options: clientOptions,
    getOptionLabel: (option: ClientProps) => option.name,
  };

  const defaultPropsWellSelector = {
    options: wellOptions,
    getOptionLabel: (option: WellProps) => option.name,
  };

  const defaultPropsAdditionalInfo = {
    options: additional_info_options,
    getOptionLabel: (option: string) => option,
  };

  return (
    <div className={styles.customToolForm}>
      <TitleComponent title="Well Info" />
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
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
            className={styles.formFieldModalCustom}
            renderInput={(params) => <TextField {...params} label="Client" />}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <Autocomplete
            id="well-selector"
            value={values.well}
            isOptionEqualToValue={(option, value) => {
              return true;
            }}
            onChange={(_, newValue) => newValue && onChangeWell(newValue)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            {...defaultPropsWellSelector}
            disablePortal
            className={styles.formFieldModalCustom}
            renderInput={(params) => <TextField {...params} label="Well" />}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <Autocomplete
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            value={values.customName}
            isOptionEqualToValue={(option, value) => {
              return true;
            }}
            onChange={(_, newValue) =>
              newValue && onChangeAdditionalInfo(newValue)
            }
            {...defaultPropsAdditionalInfo}
            disablePortal
            className={styles.formFieldModalCustom}
            renderInput={(params) => (
              <TextField {...params} label="Additional Info" />
            )}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <input
            id="outlined-basic"
            type="file"
            name="file"
            className={styles.formFieldModalCustom}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      <div className={styles.buttonGral}>
        <Button onClick={onCancel} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => onUploadFile(values)}
          variant="contained"
          disabled={!toSave}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};
