import { TextField } from "@mui/material";

interface Props {
  value: number | undefined;
  onChangeBottom: (newValue: number) => void;
}

export const BottomField = ({ value, onChangeBottom }: Props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        type="number"
        label="Bottom"
        variant="outlined"
        sx={{ width: 80 }}
        value={value}
        onChange={(event) => onChangeBottom(parseInt(event.target.value))}
      />
    </>
  );
};
