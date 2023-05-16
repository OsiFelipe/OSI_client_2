import { TextField } from "@mui/material";

interface Props {
  value: number | undefined;
  onChangeTop: (newValue: number) => void;
}

export const TopField = ({ value, onChangeTop }: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        type="number"
        label="Top"
        variant="outlined"
        sx={{ width: 80 }}
        value={value}
        onChange={(event) => {
          onChangeTop(event.target.value ? parseFloat(event.target.value) : 0);
        }}
      />
    </>
  );
};
