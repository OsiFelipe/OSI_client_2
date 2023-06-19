import { Autocomplete, TextField } from "@mui/material";
import { ProductProps } from "../../interfaces/interfaces";
import styles from "../components.module.sass";

export const ProductSelectorByPN = ({
  options,
  onSelectPN,
  value,
}: {
  options: ProductProps[];
  onSelectPN: (newValue: any) => void;
  value?: ProductProps;
}) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: ProductProps) => option.partNumber,
  };

  return (
    <>
      <Autocomplete
        id="product-selector"
        value={value}
        isOptionEqualToValue={(option, value) => {
          return true;
        }}
        onChange={(_, newValue) => newValue && onSelectPN(newValue)}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.partNumber}
            </li>
          );
        }}
        {...defaultProps}
        disablePortal
        className={styles.textField}
        renderInput={(params) => <TextField {...params} label="Part Number" />}
      />
    </>
  );
};
