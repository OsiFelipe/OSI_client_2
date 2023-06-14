import {
  Divider,
  FormGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "../../../components.module.sass";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useContext } from "react";
import SimulatorContext from "../../../../context/SimulatorContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(251,171,53,0.8)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const PressureDropTs = () => {
  const { pressSimulatorResults } = useContext(SimulatorContext);
  return (
    <div className={styles.simulatorResults}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              Pressure Drop through the Screen
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Screen Aperture
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.screenAperture}
                    </StyledTableCell>
                    <StyledTableCell align="right">ft</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Fr Free Area
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.freeArea}
                    </StyledTableCell>
                    <StyledTableCell align="right">(NA)</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Fluid Density
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.fluidDensity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      lb/ft<sup>3</sup>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Fluid Velocity
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.fluidVelocity}
                    </StyledTableCell>
                    <StyledTableCell align="right">ft/s</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      # Reynolds
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.reynolds}
                    </StyledTableCell>
                    <StyledTableCell align="right">(NA)</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Discharge Coeff. C
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.dischargeCoefficient}
                    </StyledTableCell>
                    <StyledTableCell align="right">(NA)</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Loss Press Coeff. K
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.lossPressCoeff}
                    </StyledTableCell>
                    <StyledTableCell align="right">(NA)</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Loss Press
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.lossPressure}
                    </StyledTableCell>
                    <StyledTableCell align="right">psi</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </FormGroup>
    </div>
  );
};
