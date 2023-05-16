import { Autocomplete, TextField, Grid } from "@mui/material";
import { SlaProps } from "../../interfaces/interfaces";

const options = [
  {
    id: 0,
    name: "Rod Pump",
    reqField: "Seating Nipple",
    image: "/assets/img/sla/rp.png",
  },
  {
    id: 1,
    name: "ESP",
    reqField: "Sensor Depth",
    image: "/assets/img/sla/esp.png",
  },
  {
    id: 2,
    name: "Gas Lift",
    reqField: "End of tubing",
    image: "/assets/img/sla/gl.png",
  },
  {
    id: 3,
    name: "PCP",
    reqField: "Pump Depth",
    image: "/assets/img/sla/pcp.png",
  },
];

interface Props {
  value: SlaProps;
  valueDepth: number;
  handleChangeSla: (newValue: { id: number; name: string } | null) => void;
  handleChangeMdDepth: (newValue: number) => void;
}

export const SLASelector = ({
  value,
  valueDepth,
  handleChangeSla,
  handleChangeMdDepth,
}: Props) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: { id: number; name: string }) => option.name,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
          onChange={(_, newValue) => newValue && handleChangeSla(newValue)}
          {...defaultProps}
          disablePortal
          sx={{ width: "15vw" }}
          renderInput={(params) => <TextField {...params} label="ALS" />}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          type="number"
          label={value.reqField || "Select ALS"}
          value={valueDepth}
          disabled={!!!value.reqField}
          variant="outlined"
          sx={{ width: "15vw" }}
          onChange={(event) =>
            handleChangeMdDepth(
              event.target.value
                ? parseFloat(event.target.value)
                : parseFloat("")
            )
          }
        />
      </Grid>
    </Grid>
  );
};
