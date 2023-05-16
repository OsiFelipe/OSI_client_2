import {
  NavBar,
  PdfSandSimulatorFile,
  SandSimSelector,
  ShowContent,
} from "../../components";
import styles from "../main.module.sass";
import CancelIcon from "@mui/icons-material/Cancel";
import { useScreenshot } from "usescreenshot-react";
import PrintIcon from "@mui/icons-material/Print";
import { useRef, useState, useContext } from "react";
import { PDFView } from "../../components/pdf";
import SimulatorContext from "../../context/SimulatorContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const SandSimulator = () => {
  const [inPdf, setInPdf] = useState(false);
  const { takeScreenshot } = useScreenshot();
  const ref = useRef<HTMLDivElement>(null);
  const {
    sandSimulatorValues,
    sandSimulatorResults,
    simulatorState,
    handleCancelSimulation,
  } = useContext(SimulatorContext);

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
      <NavBar title="Sand Simulation" buttons={buttons} />
      <div className={styles.techProposalForm}>
        {inPdf ? (
          <PDFView
            children={
              <PdfSandSimulatorFile
                data={sandSimulatorValues}
                results={sandSimulatorResults}
                simulator={simulatorState}
              />
            }
          />
        ) : (
          <>
            <SandSimSelector />
          </>
        )}
      </div>
    </>
  );

  return <ShowContent error={""} isLoading={false} content={content} />;
};
