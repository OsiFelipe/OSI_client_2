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
  dipTube?: boolean;
  tubingScreen?: boolean;
}

export const PressureSimForm = ({ dipTube, tubingScreen }: Props) => {
  const {
    pressSimulatorValues,
    onUpdatePressSimulatorValues,
    onSimulatePressure,
  } = useContext(SimulatorContext);

  const handleUpdateValues = (item: string, value: any) => {
    if (parseFloat(value) >= 0) onUpdatePressSimulatorValues(item, value);
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
          {dipTube && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Reference Pressure [PIP] (psi)"
                  value={pressSimulatorValues.pip}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("pip", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="DeltaP"
                  value={pressSimulatorValues.deltaP}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("deltaP", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Reference Depth [Pump Depth] (ft)"
                  value={pressSimulatorValues.refDepth}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("refDepth", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Reservoir Pressure (psi)"
                  value={pressSimulatorValues.resPressure}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("resPressure", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          {tubingScreen && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="# Screens"
                  value={pressSimulatorValues.numberOfTubingScreen}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues(
                      "numberOfTubingScreen",
                      event.target.value
                    )
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Diameter"
                  value={pressSimulatorValues.diameter}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("diameter", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
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
                  value={pressSimulatorValues.slotSize}
                  onChange={(_, newValue) =>
                    onUpdatePressSimulatorValues("slotSize", newValue)
                  }
                  {...{
                    options: ["75", "50", "20", "15", "12", "10"],
                  }}
                  disablePortal
                  className={styles.simulatorField}
                  renderInput={(params) => (
                    <TextField {...params} label="Slot Size" />
                  )}
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Open Area"
                  value={pressSimulatorValues.openArea}
                  variant="outlined"
                  className={styles.simulatorField}
                  disabled
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Screen Length (ft)"
                  value={pressSimulatorValues.screenLength}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("screenLength", event.target.value)
                  }
                />
              </Grid>
            </>
          )}

          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Fluid Rate (BFPD)"
              value={pressSimulatorValues.bfpd}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("bfpd", event.target.value)
              }
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Gas Production (MSCFD)"
              value={pressSimulatorValues.gasRate}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("gasRate", event.target.value)
              }
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Water Cut (%)"
              value={pressSimulatorValues.wCut}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("wCut", event.target.value)
              }
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Water Rate (BWPD)"
              value={pressSimulatorValues.bwpd}
              variant="outlined"
              className={styles.simulatorField}
              disabled
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Oil Rate (BOPD)"
              value={pressSimulatorValues.bopd}
              variant="outlined"
              className={styles.simulatorField}
              disabled
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="GOR (SCF/STB)"
              value={pressSimulatorValues.gor}
              variant="outlined"
              className={styles.simulatorField}
              disabled
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Temperature (F)"
                  value={pressSimulatorValues.temperature}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("temperature", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Dip Tube ID"
                  value={pressSimulatorValues.DipTubId}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("DipTubId", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Dip Tube Length (ft)"
                  value={pressSimulatorValues.dipTubeLength}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("dipTubeLength", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="API"
              value={pressSimulatorValues.api}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("api", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Gas Specific gravity"
                  value={pressSimulatorValues.sp}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("sp", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Oil Specific gravity"
                  value={pressSimulatorValues.spo}
                  variant="outlined"
                  className={styles.simulatorField}
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Specific gravity W"
              value={pressSimulatorValues.spw}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("spw", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Viscocity (cP)"
                  value={pressSimulatorValues.viscocity}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("viscocity", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Gas Viscocity (cP)"
                  value={pressSimulatorValues.gasViscosity}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("gasViscosity", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          <Grid item lg={4} sm={6} xs={12}>
            <TextField
              type="number"
              label="Fluid Viscocity (cP)"
              value={pressSimulatorValues.viscocity}
              variant="outlined"
              className={styles.simulatorField}
              onChange={(event) =>
                handleUpdateValues("viscocity", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Ap ft2"
                  value={pressSimulatorValues.ap}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("ap", event.target.value)
                  }
                />
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Surf. Tension (lb/s2)"
                  value={pressSimulatorValues.surfTension}
                  variant="outlined"
                  className={styles.simulatorField}
                  onChange={(event) =>
                    handleUpdateValues("surfTension", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
        </Grid>
      </FormGroup>
      <Button variant="outlined" sx={{ mt: 5 }} onClick={onSimulatePressure}>
        Simulate
      </Button>
    </div>
  );
};
