import React from "react";
import { SimulatorProps } from "../interfaces/interfaces";
import {
  GasSimulatorProps,
  GasSimulatorResultProps,
  PressureSimulatorProps,
  PressureSimulatorResultProps,
  SandSimulatorProps,
  SandSimulatorResultProps,
} from "../interfaces/interfaces";
import {
  initial_gas_simulator_state,
  initial_gas_simulator_results,
  initial_sand_simulator_state,
  initial_sand_simulator_results,
  initial_press_simulator_state,
  initial_press_simulator_results,
  initial_simulator_state,
} from "../utils/data";

interface Props {
  simulatorState: SimulatorProps;
  gasSimulatorValues: GasSimulatorProps;
  gasSimulatorResults: GasSimulatorResultProps;
  sandSimulatorValues: SandSimulatorProps;
  sandSimulatorResults: SandSimulatorResultProps;
  pressSimulatorValues: PressureSimulatorProps;
  pressSimulatorResults: PressureSimulatorResultProps;
  handleCancelSimulation: () => void;
  handleResetSimulation: () => void;
  onUpdateOptSimulator: (
    item: "sand" | "gas" | "pressure",
    value: string
  ) => void;
  onUpdateGasSimulatorValues: (item: string, values: any) => void;
  onUpdateSandSimulatorValues: (item: string, values: any) => void;
  onUpdatePressSimulatorValues: (item: string, values: any) => void;
  fetchTechSolution: (id: number | string) => void;
  onSimulateGas: () => void;
  onSimulateSand: () => void;
  onSimulatePressure: () => void;
}

const SimulatorContext = React.createContext<Props>({
  simulatorState: initial_simulator_state,
  gasSimulatorValues: initial_gas_simulator_state,
  gasSimulatorResults: initial_gas_simulator_results,
  sandSimulatorValues: initial_sand_simulator_state,
  sandSimulatorResults: initial_sand_simulator_results,
  pressSimulatorValues: initial_press_simulator_state,
  pressSimulatorResults: initial_press_simulator_results,
  handleCancelSimulation: () => {},
  handleResetSimulation: () => {},
  onUpdateOptSimulator: () => {},
  onUpdateGasSimulatorValues: () => {},
  onUpdateSandSimulatorValues: () => {},
  onUpdatePressSimulatorValues: () => {},
  fetchTechSolution: () => {},
  onSimulateGas: () => {},
  onSimulateSand: () => {},
  onSimulatePressure: () => {},
});

export default SimulatorContext;
