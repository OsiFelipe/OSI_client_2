import { Document } from "@react-pdf/renderer";
import {
  PressureSimulatorProps,
  PressureSimulatorResultProps,
  SimulatorProps,
} from "../../../interfaces/interfaces";
import { PressSimulatorPage } from "../pages/solution/PressSimulatorPage";

interface Props {
  data: PressureSimulatorProps;
  results: PressureSimulatorResultProps;
  simulator: SimulatorProps;
}

export const PdfPressSimulatorFile = ({ data, results, simulator }: Props) => {
  return (
    <Document>
      <PressSimulatorPage
        data={data}
        results={results}
        simulatorState={simulator}
      />
    </Document>
  );
};
