import {
  Autocomplete,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { BasicInfoprops } from "../../interfaces/interfaces";
import { api_casing_table_drift, casingOdOptions } from "../../utils/data";
import { useEffect, useState } from "react";
import styles from "../components.module.sass";

interface Props {
  basicInfo: BasicInfoprops;
  handleUpdateWbd: (item: string, value: any) => void;
  bhaInfo?: boolean;
}

const deviationOptions = ["Conventional", "Unconventional"];
const yesNoOptions = ["YES", "NO"];
const gasLiftOptions = ["Annular Flow", "Tubing Flow"];
const gasLiftOptions2 = ["Packerless", "Packer"];

export const DataWbd = ({ basicInfo, handleUpdateWbd, bhaInfo }: Props) => {
  const [wellClassification, setWellClasification] = useState("Unconventional");
  const [sandFallback, setSandFallback] = useState("YES");
  const [gasLiftPacker, setGasLiftPacker] = useState("Packer");
  const [gasLiftFlow, setGasLiftFlow] = useState("Annular Flow");
  const [tac, setTac] = useState("NO");

  useEffect(() => {
    const { bhaInfo } = basicInfo;
    if (!bhaInfo?.sandLift) setSandFallback("NO");
    if (!bhaInfo?.horizontal) setWellClasification("Conventional");
    if (!bhaInfo?.glPacker) setGasLiftPacker("Packerless");
    if (!bhaInfo?.tac) setTac("NO");
  }, []);

  const handleChangeWClass = (value: "Conventional" | "Unconventional") => {
    if (value === "Conventional") {
      handleUpdateWbd("horizontal", false);
    } else {
      handleUpdateWbd("horizontal", true);
    }
    setWellClasification(value);
  };

  const handleChangeSandFallback = (value: "YES" | "NO") => {
    if (value === "YES") {
      handleUpdateWbd("sandLift", true);
    } else {
      handleUpdateWbd("sandLift", false);
    }
    setSandFallback(value);
  };

  const handleChangeTac = (value: "YES" | "NO") => {
    if (value === "YES") {
      handleUpdateWbd("tac", true);
    } else {
      handleUpdateWbd("tac", false);
    }
    setTac(value);
  };

  const handleChangeGasLift = (value: "Packerless" | "Packer") => {
    if (value === "Packer") {
      handleUpdateWbd("glPacker", true);
    } else {
      handleUpdateWbd("glPacker", false);
    }
    setGasLiftPacker(value);
  };

  const handleUpdateCasingOd = (newValue: string) => {
    if (newValue) {
      let weight = newValue.split(" - ")[1];
      handleUpdateWbd("casingOd", newValue);
      handleUpdateWbd("weight", weight);
      Object.entries(api_casing_table_drift).forEach((entry) => {
        if (entry[0] === newValue) {
          handleUpdateWbd("driftCasing", entry[1].drift);
          handleUpdateWbd("casingId", entry[1].id);
        }
      });
    }
  };

  return (
    <div>
      <FormGroup>
        <Grid container spacing={2}>
          <>
            <Grid item xs={12}>
              <Typography mt={2} variant="h6">
                BHA Information
              </Typography>
              <Divider />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={basicInfo.bhaInfo?.casingOd}
                onChange={(_, newValue) =>
                  newValue && handleUpdateCasingOd(newValue)
                }
                {...{
                  options: casingOdOptions,
                }}
                disablePortal
                disabled={!bhaInfo}
                className={styles.textField}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Casing OD (in) - Weight (lb/ft)"
                  />
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="text"
                label="Casing ID (in)"
                value={basicInfo.bhaInfo?.casingId}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="text"
                label="Drift Casing (in)"
                value={basicInfo.bhaInfo?.driftCasing}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="Fluid Production (BFPD)"
                value={basicInfo.bhaInfo?.bfpd}
                disabled={!bhaInfo}
                variant="outlined"
                className={styles.textField}
                onChange={(event) =>
                  parseInt(event.target.value) >= 0 &&
                  handleUpdateWbd("bfpd", event.target.value || 0)
                }
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="Water Cut (%)"
                value={basicInfo.bhaInfo?.waterCut}
                disabled={!bhaInfo}
                variant="outlined"
                className={styles.textField}
                onChange={(event) =>
                  parseInt(event.target.value) >= 0 &&
                  parseInt(event.target.value) <= 100 &&
                  handleUpdateWbd("waterCut", event.target.value || 0)
                }
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="text"
                label="Oil Flow (BOPD)"
                value={basicInfo.bhaInfo?.bopd}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="text"
                label="Water Flow"
                value={basicInfo.bhaInfo?.bwpd}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="Gas Flow (MCFD)"
                value={basicInfo.bhaInfo?.gasFlow}
                disabled={!bhaInfo}
                variant="outlined"
                className={styles.textField}
                onChange={(event) =>
                  parseInt(event.target.value) >= 0 &&
                  handleUpdateWbd("gasFlow", event.target.value || 0)
                }
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="GOR (SCF/STB)"
                value={basicInfo.bhaInfo?.gor}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="GLR (SCF/STB)"
                value={basicInfo.bhaInfo?.glr}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={basicInfo.bhaInfo?.tubing}
                onChange={(_, newValue) =>
                  newValue && handleUpdateWbd("tubing", newValue)
                }
                {...{
                  options: ['2-3/8"', '2-7/8"'],
                }}
                disablePortal
                disabled={!bhaInfo}
                className={styles.textField}
                renderInput={(params) => (
                  <TextField {...params} label="Tubing (in)" />
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                type="number"
                label="Top of Liner (MD ft)"
                value={basicInfo.bhaInfo?.tol}
                variant="outlined"
                className={styles.textField}
                onChange={(event) =>
                  parseInt(event.target.value) >= 0 &&
                  handleUpdateWbd("tol", event.target.value)
                }
              />
            </Grid>
          </>

          <Grid item xs={12}>
            <Typography mt={1} variant="h6">
              Additional Information
            </Typography>
            <Divider />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Autocomplete
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                );
              }}
              className={styles.textFieldAdd}
              value={wellClassification}
              onChange={(_, newValue) =>
                (newValue === "Unconventional" ||
                  newValue === "Conventional") &&
                handleChangeWClass(newValue)
              }
              {...{
                options: deviationOptions,
              }}
              disablePortal
              renderInput={(params) => (
                <TextField {...params} label="Well Classification" />
              )}
            />
          </Grid>
          {basicInfo.sla.id === 0 && basicInfo.sla.name === "Rod Pump" && (
            <>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  value={tac}
                  onChange={(_, newValue) =>
                    (newValue === "YES" || newValue === "NO") &&
                    handleChangeTac(newValue)
                  }
                  {...{
                    options: yesNoOptions,
                  }}
                  disablePortal
                  className={styles.textFieldAdd}
                  renderInput={(params) => (
                    <TextField {...params} label="TAC above SN?" />
                  )}
                />
              </Grid>
            </>
          )}
          {basicInfo.sla.id === 1 && (
            <>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  value={sandFallback}
                  onChange={(_, newValue) =>
                    (newValue === "YES" || newValue === "NO") &&
                    handleChangeSandFallback(newValue)
                  }
                  {...{
                    options: yesNoOptions,
                  }}
                  disablePortal
                  className={styles.textFieldAdd}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sand fallback Eq. above the Pump?"
                    />
                  )}
                />
              </Grid>
            </>
          )}
          {basicInfo.sla.id === 2 && (
            <>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  value={gasLiftPacker}
                  onChange={(_, newValue) =>
                    (newValue === "Packerless" || newValue === "Packer") &&
                    handleChangeGasLift(newValue)
                  }
                  {...{
                    options: gasLiftOptions2,
                  }}
                  disablePortal
                  className={styles.textFieldAdd}
                  renderInput={(params) => (
                    <TextField {...params} label="Gas Lift Options" />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  value={gasLiftFlow}
                  onChange={(_, newValue) =>
                    newValue && setGasLiftFlow(newValue)
                  }
                  {...{
                    options: gasLiftOptions,
                  }}
                  disablePortal
                  className={styles.textFieldAdd}
                  renderInput={(params) => (
                    <TextField {...params} label="Flow" />
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>
      </FormGroup>
    </div>
  );
};
