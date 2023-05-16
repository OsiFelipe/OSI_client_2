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
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useContext } from "react";
import SimulatorContext from "../../../../context/SimulatorContext";
import styles from "../../../components.module.sass";

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

export const PackerTypeGas = () => {
  const { gasSimulatorResults } = useContext(SimulatorContext);
  return (
    <div className={styles.simulatorResults}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              Packer Type Gas Separator
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Free Gas Entering Pump wo/Separator
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.freeGasEnteringPump}
                    </StyledTableCell>
                    <StyledTableCell align="right">scf/d</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Gas Bubble Terminal Velocity
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.gasBubbleTerminalVelocity}
                    </StyledTableCell>
                    <StyledTableCell align="right">ft/s</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Cross Sectional Area in Annulus
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.crossSectionalArea}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ft<sup>2</sup>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      In-Situ Superficial Liquid Velocity Inside Casing Annular
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.inSituSuperficialLiquidVelocity}
                    </StyledTableCell>
                    <StyledTableCell align="right">ft/s</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Natural Separation Effeciency
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.naturalSeparationEfficiency}
                    </StyledTableCell>
                    <StyledTableCell align="right">%</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Free Gas Entering Pup w/separator
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.freeGasEnteringPumbWithSeparator}
                    </StyledTableCell>
                    <StyledTableCell align="right">scf/d</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Quiet Zone Volume
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.quiteZoneVolume}
                    </StyledTableCell>
                    <StyledTableCell align="right">gal</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Effective Strokes
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.effectiveStrokes}
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Retention Time
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {gasSimulatorResults.retentionTime}
                    </StyledTableCell>
                    <StyledTableCell align="right">min</StyledTableCell>
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
