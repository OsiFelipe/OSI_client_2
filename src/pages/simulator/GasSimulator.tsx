import {
  GasSimSelector,
  NavBar,
  PdfGasSimulatorFile,
  ShowContent,
} from "../../components";
import styles from "../main.module.sass";
import CancelIcon from "@mui/icons-material/Cancel";
import { useScreenshot } from "usescreenshot-react";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef, useState, useContext, useEffect } from "react";
import { PDFView } from "../../components/pdf";
import SimulatorContext from "../../context/SimulatorContext";

export const GasSimulator = () => {
  const [inPdf, setInPdf] = useState(false);
  const { takeScreenshot } = useScreenshot();
  const ref = useRef<HTMLDivElement>(null);
  const {
    gasSimulatorValues,
    gasSimulatorResults,
    simulatorState,
    handleResetSimulation,
    handleCancelSimulation,
  } = useContext(SimulatorContext);

  useEffect(() => {
    handleResetSimulation();
  }, []);

  const buttons = [
    {
      title: "Cancel",
      action: handleCancelSimulation,
      icon: <CancelIcon />,
      disabled: false,
    },
    {
      title: inPdf ? "Return" : "Print",
      action: () => setInPdf(!inPdf),
      icon: inPdf ? <ArrowBackIcon /> : <PrintIcon />,
      disabled: false,
    },
  ];

  const getImage = () => {
    if (!ref.current) {
      return;
    }
    takeScreenshot(ref.current, {
      backgroundColor: null,
      logging: false,
    }).catch(console.log);
  };

  let content: JSX.Element | JSX.Element[];

  content = (
    <>
      <NavBar title="Gas Simulation" buttons={buttons} />
      <div className={styles.techProposalForm}>
        {inPdf ? (
          <PDFView
            children={
              <PdfGasSimulatorFile
                data={gasSimulatorValues}
                results={gasSimulatorResults}
                simulator={simulatorState}
              />
            }
          />
        ) : (
          <>
            <GasSimSelector />
          </>
        )}
      </div>
    </>
  );

  return <ShowContent error={""} isLoading={false} content={content} />;
};
