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
  packerless?: boolean;
  packertype?: boolean;
  poorboy?: boolean;
}

const gForceOption = ["350", "400", "450", "500", "550"];

const gBodyDimensions = [
  '2-3/8" x 3"',
  '2-7/8" x 3-1/2"',
  '2-7/8" x 4"',
  '2-7/8" x 4-1/2"',
  '2-7/8" x 5-1/2"',
  '3-1/2" x 4-1/2"',
  '3-1/2" x 5-1/2"',
];

export const GasSimulatorForm = ({
  packerless,
  packertype,
  poorboy,
}: Props) => {
  const { gasSimulatorValues, onUpdateGasSimulatorValues, onSimulateGas } =
    useContext(SimulatorContext);

  const handleUpdateValues = (item: string, value: any) => {
    if (parseFloat(value) >= 0) onUpdateGasSimulatorValues(item, value);
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
          {packerless ? (
            <>
              <Grid item xs={4}>
                <Autocomplete
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  value={gasSimulatorValues.packerlessSize}
                  onChange={(_, newValue) =>
                    handleUpdateValues("packerlessSize", newValue)
                  }
                  {...{
                    options: gForceOption,
                  }}
                  disablePortal
                  sx={{ width: "20vw" }}
                  renderInput={(params) => (
                    <TextField {...params} label="G-Force Packerless Size" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Number of Gas Bodies"
                  value={gasSimulatorValues.numberGasBodies}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("numberGasBodies", event.target.value)
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
                  value={gasSimulatorValues.gasBodyDimensions}
                  onChange={(_, newValue) =>
                    handleUpdateValues("gasBodyDimensions", newValue)
                  }
                  {...{
                    options: gBodyDimensions,
                  }}
                  disablePortal
                  sx={{ width: "20vw" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Gas Body Dimensions" />
                  )}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Percentage Runtime (%)"
                  value={gasSimulatorValues.percentageRuntime}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("percentageRuntime", event.target.value)
                  }
                />
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Plunger Size (in)"
              value={gasSimulatorValues.plungerSize}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("plungerSize", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Stroke Length (in)"
              value={gasSimulatorValues.strokeLength}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("strokeLength", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Pump Speed (spm)"
              value={gasSimulatorValues.pumpSpeed}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("pumpSpeed", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Pump Capacity (BFPD)"
              value={gasSimulatorValues.pumpCapacity}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Pump Capacity / Stroke(BFPD)"
              value={gasSimulatorValues.pumpCapacityByStroke}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Production of Fluid per day (BFPD)"
              value={gasSimulatorValues.bfpd}
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
              label="Water Cut (%)"
              value={gasSimulatorValues.wCut}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                parseInt(event.target.value) >= 0 &&
                parseInt(event.target.value) <= 100 &&
                handleUpdateValues("wCut", event.target.value || 0)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Oil Flow (BOPD)"
              value={gasSimulatorValues.bopd}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              label="Water Flow"
              value={gasSimulatorValues.bwpd}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Gas Flow (MCFD)"
              value={gasSimulatorValues.gasRate}
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
              label="GLR (SCF/STB)"
              value={gasSimulatorValues.glr}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="GOR (SCF/STB)"
              value={gasSimulatorValues.gor}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="WOR (BWPD/STBPD)"
              value={gasSimulatorValues.wor}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Temperature (F)"
              value={gasSimulatorValues.temperature}
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
              label="PIP (Psi)"
              value={gasSimulatorValues.pip}
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
              label="Casing ID (in)"
              value={gasSimulatorValues.casingId}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("casingId", event.target.value)
              }
            />
          </Grid>
          {poorboy ||
            (packerless && (
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Tubing OD (in)"
                  value={gasSimulatorValues.tubingOd}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("tubingOd", event.target.value)
                  }
                />
              </Grid>
            ))}
          {packerless ? (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Neck OD (in)"
                  value={gasSimulatorValues.neckOD}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Separator OD (in)"
                  value={gasSimulatorValues.gasSeparatorOD}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Separator ID (in)"
                  value={gasSimulatorValues.gasSeparatorId}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="OD Dip Tube (in)"
                  value={gasSimulatorValues.ODdiptube}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  disabled
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Separator OD (in)"
                  value={gasSimulatorValues.gasSeparatorOD}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("gasSeparatorOD", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Gas Separator ID (in)"
                  value={gasSimulatorValues.gasSeparatorId}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("gasSeparatorId", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="OD Dip Tube (in)"
                  value={gasSimulatorValues.ODdiptube}
                  variant="outlined"
                  sx={{ width: "20vw" }}
                  onChange={(event) =>
                    handleUpdateValues("ODdiptube", event.target.value)
                  }
                />
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Water SPGr"
              value={gasSimulatorValues.waterSP}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("waterSP", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Gas SPGr"
              value={gasSimulatorValues.gasSP}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("gasSP", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Oil SPGr"
              value={gasSimulatorValues.oilSP}
              variant="outlined"
              sx={{ width: "20vw" }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Oil API"
              value={gasSimulatorValues.oilApi}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("oilApi", event.target.value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Interfacial Tension"
              value={gasSimulatorValues.interfacialTension}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("interfacialTension", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Gravitational Force"
              value={gasSimulatorValues.gravitationalForce}
              variant="outlined"
              sx={{ width: "20vw" }}
              onChange={(event) =>
                handleUpdateValues("gravitationalForce", event.target.value)
              }
            />
          </Grid>

          {packertype && (
            <Grid item xs={4}>
              <TextField
                type="number"
                label="Gas Separator Length (ft)"
                value={gasSimulatorValues.gasSeparatorLength}
                variant="outlined"
                sx={{ width: "20vw" }}
                onChange={(event) =>
                  handleUpdateValues("gasSeparatorLength", event.target.value)
                }
              />
            </Grid>
          )}
        </Grid>
      </FormGroup>
      <Button variant="outlined" sx={{ mt: 5 }} onClick={onSimulateGas}>
        Simulate
      </Button>
    </div>
  );
};
