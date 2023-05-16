import { TitleComponent } from "../ui/TitleComponent";
import { FullScreenModal } from "../ui/FullScreenModal";
import { GasSimSelector } from "./simulators/gas/GasSimSelector";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import SimulatorContext from "../../context/SimulatorContext";
import { SandSimSelector } from "./simulators/sand/SandSimSelector";
import { PressureSimSelector } from "./simulators/pressure/PressureSimSelector";
import {
  initial_gas_simulator_state,
  initial_gas_simulator_results,
  initial_sand_simulator_state,
  initial_sand_simulator_results,
  initial_press_simulator_state,
  initial_press_simulator_results,
} from "../../utils/data";
import styles from "../components.module.sass";

export const SolutionComponent = () => {
  const {
    onUpdateSolution,
    data: {
      solution: { sandSolution, gasSolution, pressureSolution },
    },
  } = useContext(DataContext);

  const {
    gasSimulatorValues,
    gasSimulatorResults,
    sandSimulatorValues,
    sandSimulatorResults,
    pressSimulatorValues,
    pressSimulatorResults,
    simulatorState,
  } = useContext(SimulatorContext);

  const handleSaveGasSimulation = () => {
    onUpdateSolution(
      "gasSolution",
      true,
      {
        data: gasSimulatorValues,
        results: gasSimulatorResults,
      },
      simulatorState
    );
  };

  const handleRemoveGasSimulation = () => {
    onUpdateSolution(
      "gasSolution",
      false,
      {
        data: initial_gas_simulator_state,
        results: initial_gas_simulator_results,
      },
      simulatorState
    );
  };

  const handleSaveSandSimulation = () => {
    onUpdateSolution(
      "sandSolution",
      true,
      {
        data: sandSimulatorValues,
        results: sandSimulatorResults,
      },
      simulatorState
    );
  };
  const handleSavePressureSimulation = () => {
    onUpdateSolution(
      "pressureSolution",
      true,
      {
        data: pressSimulatorValues,
        results: pressSimulatorResults,
      },
      simulatorState
    );
  };

  const handleRemoveSandSimulation = () => {
    onUpdateSolution(
      "sandSolution",
      false,
      {
        data: initial_sand_simulator_state,
        results: initial_sand_simulator_results,
      },
      simulatorState
    );
  };

  const handleRemovePressureSimulation = () => {
    onUpdateSolution(
      "pressureSolution",
      false,
      {
        data: initial_press_simulator_state,
        results: initial_press_simulator_results,
      },
      simulatorState
    );
  };

  return (
    <>
      <TitleComponent title="Simulation" />
      <div className={styles.solutionForm}>
        <FullScreenModal
          title="Gas Simulator"
          onSave={handleSaveGasSimulation}
          onRemove={handleRemoveGasSimulation}
          active={gasSolution}
        >
          <GasSimSelector />
        </FullScreenModal>
        <FullScreenModal
          title="Sand Simulator"
          onSave={handleSaveSandSimulation}
          onRemove={handleRemoveSandSimulation}
          active={sandSolution}
        >
          <SandSimSelector />
        </FullScreenModal>
        <FullScreenModal
          title="Pressure Drop Simulator"
          onSave={handleSavePressureSimulation}
          onRemove={handleRemovePressureSimulation}
          active={pressureSolution}
        >
          <PressureSimSelector />
        </FullScreenModal>
      </div>
    </>
  );
};
