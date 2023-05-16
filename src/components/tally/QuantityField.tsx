import { TextField } from "@mui/material";

interface Props {
  value: number | undefined;
  onChangeQTY: (newValue: number) => void;
  disabled?: boolean;
  defaultValue?: number;
}

export const QuantityField = ({
  value,
  onChangeQTY,
  disabled,
  defaultValue,
}: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        type="number"
        label="Quantity"
        variant="outlined"
        sx={{ width: 70 }}
        value={value}
        disabled={disabled}
        onChange={(event) =>
          parseInt(event.target.value) >= 1 &&
          onChangeQTY(parseInt(event.target.value))
        }
        defaultValue={defaultValue}
      />
    </>
  );
};
