import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const iconStyles = {
  backgroundColor: "rgb(251,171,53, 0.9)",
  padding: "4px",
  color: "white",
  marginRight: "5px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgb(90,100,119)",
  },
};

export const SearchInput = ({ label, value, setValue }: Props) => {
  return (
    <>
      <TextField
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={iconStyles} />
            </InputAdornment>
          ),
        }}
        type="text"
        label={label}
        variant="outlined"
        sx={{ marginTop: "1rem", width: "80%" }}
      ></TextField>
    </>
  );
};
