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

export const PumpGuard = () => {
  const { sandSimulatorResults } = useContext(SimulatorContext);
  return (
    <div className={styles.simulatorResults}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              Pump Guard
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
                      Size of Sand
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.sizeOfSand}
                    </StyledTableCell>
                    <StyledTableCell align="right">Mesh</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Total Open Area of Screen
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.totalOpenAreaOfScreen}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      in<sup>2</sup>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      1440 minute per day *% of time
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.minutePerDay}
                    </StyledTableCell>
                    <StyledTableCell align="right">min/day</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Production per minute of run
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.productionPerMinuteOfRun}
                    </StyledTableCell>
                    <StyledTableCell align="right">bbl/min</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Production Cubic Inches
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.productionCubicInches}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      in<sup>3</sup>/min
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Production inch by screen Opening
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.productionInchByOpening}
                    </StyledTableCell>
                    <StyledTableCell align="right">in/sec</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Max. Velocity by TS
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {sandSimulatorResults.maxByTs}
                    </StyledTableCell>
                    <StyledTableCell align="right">in/sec</StyledTableCell>
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
