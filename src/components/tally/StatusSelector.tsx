import { Autocomplete, TextField } from "@mui/material";

const options = [
  { id: 0, name: "NEW" },
  { id: 1, name: "USED" },
];

interface Props {
  value: { id: number; name: string };
  onUpdateStatus: (newValue: { id: number; name: string } | null) => void;
}

export const StatusSelector = ({ value, onUpdateStatus }: Props) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: { id: number; name: string }) => option.name,
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
        onChange={(_, newValue) => onUpdateStatus(newValue)}
        {...defaultProps}
        disablePortal
        sx={{ width: 120 }}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
    </>
  );
};
