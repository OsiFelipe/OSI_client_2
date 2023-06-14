import { Autocomplete, TextField } from "@mui/material";
import { ClientProps } from "../../interfaces/interfaces";
import styles from "../components.module.sass";

interface Props {
  options: ClientProps[];
  value: ClientProps;
  handleChangeClient: (newValue: ClientProps | null) => void;
}

export const ClientSelector = ({
  options,
  value,
  handleChangeClient,
}: Props) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: ClientProps) => option.name,
  };
  return (
    <>
      <Autocomplete
        id="client-selector"
        value={value}
        isOptionEqualToValue={(option, value) => {
          return true;
        }}
        onChange={(_, newValue) => newValue && handleChangeClient(newValue)}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        {...defaultProps}
        disablePortal
        className={styles.textFieldClient}
        renderInput={(params) => <TextField {...params} label="Client name" />}
      />
    </>
  );
};
