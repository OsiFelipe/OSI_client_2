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
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Reference Pressure [PIP] (psi)"
                  value={pressSimulatorValues.pip}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("pip", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="DeltaP"
                  value={pressSimulatorValues.deltaP}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("deltaP", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Reference Depth [Pump Depth] (ft)"
                  value={pressSimulatorValues.refDepth}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("refDepth", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Reservoir Pressure (psi)"
                  value={pressSimulatorValues.resPressure}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("resPressure", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          {tubingScreen && (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="# Screens"
                  value={pressSimulatorValues.numberOfTubingScreen}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues(
                      "numberOfTubingScreen",
                      event.target.value
                    )
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Diameter"
                  value={pressSimulatorValues.diameter}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("diameter", event.target.value)
                  }
                />
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
                  value={pressSimulatorValues.slotSize}
                  onChange={(_, newValue) =>
                    onUpdatePressSimulatorValues("slotSize", newValue)
                  }
                  {...{
                    options: ["75", "50", "20", "15", "12", "10"],
                  }}
                  disablePortal
                  sx={{ width: "20vw" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Slot Size" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Open Area"
                  value={pressSimulatorValues.openArea}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Screen Length (ft)"
                  value={pressSimulatorValues.screenLength}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("screenLength", event.target.value)
                  }
                />
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Fluid Rate (BFPD)"
              value={pressSimulatorValues.bfpd}
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
              label="Gas Production (MSCFD)"
              value={pressSimulatorValues.gasRate}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("gasRate", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Water Cut (%)"
              value={pressSimulatorValues.wCut}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("wCut", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Water Rate (BWPD)"
              value={pressSimulatorValues.bwpd}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Oil Rate (BOPD)"
              value={pressSimulatorValues.bopd}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="GOR (SCF/STB)"
              value={pressSimulatorValues.gor}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Temperature (F)"
                  value={pressSimulatorValues.temperature}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("temperature", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Dip Tube ID"
                  value={pressSimulatorValues.DipTubId}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("DipTubId", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Dip Tube Length (ft)"
                  value={pressSimulatorValues.dipTubeLength}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("dipTubeLength", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          <Grid item xs={4}>
            <TextField
              type="number"
              label="API"
              value={pressSimulatorValues.api}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("api", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Specific gravity"
                  value={pressSimulatorValues.sp}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("sp", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Oil Specific gravity"
                  value={pressSimulatorValues.spo}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Specific gravity W"
              value={pressSimulatorValues.spw}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("spw", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Viscocity (cP)"
                  value={pressSimulatorValues.viscocity}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("viscocity", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Viscocity (cP)"
                  value={pressSimulatorValues.gasViscosity}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("gasViscosity", event.target.value)
                  }
                />
              </Grid>
            </>
          )}
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Fluid Viscocity (cP)"
              value={pressSimulatorValues.viscocity}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("viscocity", event.target.value)
              }
            />
          </Grid>
          {dipTube && (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Ap ft2"
                  value={pressSimulatorValues.ap}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("ap", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Surf. Tension (lb/s2)"
                  value={pressSimulatorValues.surfTension}
                  variant="outlined"
                  sx={{ width: "20vw" }}
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
