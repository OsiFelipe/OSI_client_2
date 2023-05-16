import { Autocomplete, TextField } from "@mui/material";

const options = [
  { id: 0, name: "OSI" },
  { id: 1, name: "Operator" },
];

interface Props {
  value: { id: number; name: string };
  onUpdateSupplier: (newValue: { id: number; name: string } | null) => void;
}

export const SupplierSelector = ({ value, onUpdateSupplier }: Props) => {
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
        onChange={(_, newValue) => onUpdateSupplier(newValue)}
        {...defaultProps}
        disablePortal
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label="Supplier" />}
      />
    </>
  );
};
