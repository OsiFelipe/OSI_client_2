import { Autocomplete, TextField } from "@mui/material";
import { ProductProps } from "../../interfaces/interfaces";
import styles from "../components.module.sass";

export const ProductSelectorByName = ({
  options,
  onSelectName,
  value,
  size,
}: {
  options: ProductProps[];
  onSelectName: (newValue: any) => void;
  value?: ProductProps;
  size?: number;
}) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: ProductProps) => option.name,
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
        onChange={(_, newValue) => newValue && onSelectName(newValue)}
        {...defaultProps}
        disablePortal
        className={styles.textField}
        renderInput={(params) => <TextField {...params} label="Description" />}
      />
    </>
  );
};
