import {
  Autocomplete,
  Button,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import SimulatorContext from "../../../../context/SimulatorContext";
import styles from "../../../components.module.sass";

interface Props {
  tubingScreen?: boolean;
  pumpGuard?: boolean;
  superPerf?: boolean;
}

const spOptions = ['2-3/8"', '2-7/8"', '3-1/2"'];

const tsOptions = [
  "2-3/8\" x 8'",
  "2-7/8\" x 8'",
  "3-1/2\" x 8'",
  "2-3/8\" x 23.5'",
  "2-7/8\" x 23.5'",
  "3-1/2\" x 23.5'",
];

const pgOptions = [
  '1" x 9"',
  "1\" x 2'",
  "1\" x 3'",
  "1\" x 6'",
  "1\" x 8'",
  "1\" x 10'",
  '1-1/4" x 9"',
  "1-1/4\" x 2'",
  "1-1/4\" x 3'",
  "1-1/4\" x 6'",
  "1-1/4\" x 8'",
  "1-1/4\" x 10'",
  '1-1/2" x 9"',
  "1-1/2\" x 2'",
  "1-1/2\" x 3'",
  "1-1/2\" x 6'",
  "1-1/2\" x 8'",
  "1-1/2\" x 10'",
];

const slotOptions = [
  "0.006",
  "0.008",
  "0.01",
  "0.012",
  "0.015",
  "0.018",
  "0.02",
  "0.025",
  "0.03",
  "0.035",
  "0.05",
  "0.075",
  "0.125",
];

const slotPgOptions = [
  "0.006",
  "0.012",
  "0.018",
  "0.025",
  "0.035",
  "0.05",
  "0.075",
  "0.125",
];

const slotSpOptions = ["0.075"];

const wellClasification = ["AVERAGE", "BAD", "SEVERE"];

export const SandSimulatorForm = ({
  tubingScreen,
  pumpGuard,
  superPerf,
}: Props) => {
  const { sandSimulatorValues, onUpdateSandSimulatorValues, onSimulateSand } =
    useContext(SimulatorContext);

  const handleUpdateValues = (item: string, value: any) => {
    if (parseFloat(value) >= 0) onUpdateSandSimulatorValues(item, value);
  };
  return (
    <div className={styles.simulator}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              General Data Entry
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Production of Total liquid barrel (BFPD)"
              value={sandSimulatorValues.bfpd}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("bfpd", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Percentage of Runtime"
              value={sandSimulatorValues.percentageRuntime}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("percentageRuntime", event.target.value)
              }
            />
          </Grid>
          {tubingScreen && (
            <Grid item xs={4}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                value={sandSimulatorValues.selectedTubingScreen}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("selectedTubingScreen", newValue)
                }
                {...{
                  options: tsOptions,
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => (
                  <TextField {...params} label="Selected Tubing Screen" />
                )}
              />
            </Grid>
          )}
          {superPerf && (
            <Grid item xs={4}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                value={sandSimulatorValues.selectedSuperPerf}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("selectedSuperPerf", newValue)
                }
                {...{
                  options: spOptions,
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => (
                  <TextField {...params} label="Selected Super Perf" />
                )}
              />
            </Grid>
          )}
          {pumpGuard && (
            <Grid item xs={4}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                value={sandSimulatorValues.selectedPumbGuard}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("selectedPumbGuard", newValue)
                }
                {...{
                  options: pgOptions,
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => (
                  <TextField {...params} label="Selected Pump Guard" />
                )}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            {pumpGuard && (
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={sandSimulatorValues.slotPg}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("slotPg", newValue)
                }
                {...{
                  options: slotPgOptions,
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => <TextField {...params} label="Slot" />}
              />
            )}
            {tubingScreen && (
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={sandSimulatorValues.slot}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("slot", newValue)
                }
                {...{
                  options: slotOptions,
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => <TextField {...params} label="Slot" />}
              />
            )}
            {superPerf && (
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={sandSimulatorValues.slotSp}
                onChange={(_, newValue) =>
                  onUpdateSandSimulatorValues("slotSp", newValue)
                }
                {...{
                  options: slotSpOptions,
                }}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                disablePortal
                sx={{ width: "20vw" }}
                renderInput={(params) => <TextField {...params} label="Slot" />}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                );
              }}
              isOptionEqualToValue={(option, value) => {
                return true;
              }}
              value={sandSimulatorValues.wellClasification}
              onChange={(_, newValue) =>
                onUpdateSandSimulatorValues("wellClasification", newValue)
              }
              {...{
                options: wellClasification,
              }}
              disablePortal
              sx={{ width: "20vw" }}
              renderInput={(params) => (
                <TextField {...params} label="Well Clasification" />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Open Area of Screen in2"
              value={sandSimulatorValues.openAreaOfScreen}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          {tubingScreen && (
            <Grid item xs={4}>
              <TextField
                type="number"
                label="# Tubing Screen"
                value={sandSimulatorValues.numberOfTubingScreen}
                variant="outlined"
                sx={{ width: "20vw" }}
                onChange={(event) =>
                  handleUpdateValues("numberOfTubingScreen", event.target.value)
                }
              />
            </Grid>
          )}
          {superPerf && (
            <Grid item xs={4}>
              <TextField
                type="number"
                label="# Tubing Screen"
                value={sandSimulatorValues.numberOfTubingScreen}
                variant="outlined"
                sx={{ width: "20vw" }}
                onChange={(event) =>
                  handleUpdateValues("numberOfTubingScreen", event.target.value)
                }
              />
            </Grid>
          )}
          {pumpGuard && (
            <Grid item xs={4}>
              <TextField
                type="number"
                label="# Pump Guards"
                value={sandSimulatorValues.numberOfPumpGuard}
                variant="outlined"
                sx={{ width: "20vw" }}
                onChange={(event) =>
                  handleUpdateValues("numberOfPumpGuard", event.target.value)
                }
              />
            </Grid>
          )}
        </Grid>
      </FormGroup>
      <Button variant="outlined" sx={{ mt: 5 }} onClick={onSimulateSand}>
        Simulate
      </Button>
    </div>
  );
};
