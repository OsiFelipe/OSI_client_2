import { Autocomplete, TextField } from "@mui/material";
import { WellProps } from "../../interfaces/interfaces";

interface Props {
  value: WellProps;
  options: WellProps[];
  handleChangeWell: (newValue: WellProps | null) => void;
}

export const WellSelector = ({ value, options, handleChangeWell }: Props) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: WellProps) => option.name,
  };

  return (
    <>
      <Autocomplete
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        value={value}
        isOptionEqualToValue={(option, value) => {
          return true;
        }}
        onChange={(_, newValue) => newValue && handleChangeWell(newValue)}
        {...defaultProps}
        disablePortal
        sx={{ width: "30vw" }}
        renderInput={(params) => <TextField {...params} label="Well name" />}
      />
    </>
  );
};
