import { Document } from "@react-pdf/renderer";
import { SandSimulatorPage } from "../pages/solution/SandSimulatorPage";
import {
  SandSimulatorProps,
  SandSimulatorResultProps,
  SimulatorProps,
} from "../../../interfaces/interfaces";

interface Props {
  data: SandSimulatorProps;
  results: SandSimulatorResultProps;
  simulator: SimulatorProps;
}

export const PdfSandSimulatorFile = ({ data, results, simulator }: Props) => {
  return (
    <Document>
      <SandSimulatorPage
        data={data}
        results={results}
        simulatorState={simulator}
      />
    </Document>
  );
};
