import { Document } from "@react-pdf/renderer";

import { GasSimulatorPage } from "../pages/solution/GasSimulatorPage";
import { SimulatorProps } from "../../../interfaces/interfaces";
import {
  GasSimulatorProps,
  GasSimulatorResultProps,
} from "../../../interfaces/interfaces";

interface Props {
  data: GasSimulatorProps;
  results: GasSimulatorResultProps;
  simulator: SimulatorProps;
}

export const PdfGasSimulatorFile = ({ data, results, simulator }: Props) => {
  return (
    <Document>
      <GasSimulatorPage
        data={data}
        results={results}
        simulatorState={simulator}
      />
    </Document>
  );
};
