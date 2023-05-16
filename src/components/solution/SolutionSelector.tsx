import { FormGroup, FormControlLabel, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { SolutionProps } from "../../interfaces/interfaces";

interface Props {
  solution: SolutionProps;
  handleChangeSolution: (item: string, value: boolean) => void;
}
export const SolutionSelector = ({ handleChangeSolution, solution }: Props) => {
  return (
    <FormGroup>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <FormControlLabel
            onChange={() =>
              handleChangeSolution("sandSolution", !solution.sandSolution)
            }
            checked={solution.sandSolution}
            control={<Checkbox />}
            label="Sand"
            sx={{ width: "30vw" }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            onChange={() =>
              handleChangeSolution("gasSolution", !solution.gasSolution)
            }
            checked={solution.gasSolution}
            control={<Checkbox />}
            label="Gas"
            sx={{ width: "30vw" }}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};
