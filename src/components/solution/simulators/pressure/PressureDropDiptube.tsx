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

export const PressureDropDiptube = () => {
  const { pressSimulatorResults } = useContext(SimulatorContext);
  return (
    <div className={styles.simulatorResults}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              Pressure Drop Dip Tube
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
                      Flow Regime
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.flowRegime}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Relavite Roughness
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.relativeRoughness}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Reynolds
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.reynolds}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Friction Factor
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.frictionFactor}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      delta P
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pressSimulatorResults.deltaP}
                    </StyledTableCell>
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
