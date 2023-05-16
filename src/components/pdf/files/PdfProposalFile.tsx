import { Document } from "@react-pdf/renderer";
import {
  BasicInfoPage,
  PresentationPage,
  TableTallyPage,
  WbdSecondPage,
  WbdLastPageVert,
  WbdFirstPageESP,
  WbdFirstPageGL,
  WbdFirstPageSRP,
  WbdFirstPageGlPacker,
  WbdFirstPageEspSL,
  Wellbore3dpage,
  WbdLastPageHor,
  GasSimulatorPage,
  WbdFirstPagePCP,
} from "../pages";
import { DataProps } from "../../../interfaces/interfaces";
import { SandSimulatorPage } from "../pages/solution/SandSimulatorPage";
import { PressSimulatorPage } from "../pages/solution/PressSimulatorPage";
import { WbdFirstPageGen } from "../pages/wbd/WbdFirstPageGen";

export const PdfProposalFile = ({ data }: { data: DataProps }) => {
  return (
    <Document>
      <>
        <PresentationPage data={data} />
        <BasicInfoPage data={data} />
        {data.solution.gasSolution && (
          <GasSimulatorPage
            data={data.solution.gasSimulator.data}
            results={data.solution.gasSimulator.results}
            simulatorState={data.simulator}
          />
        )}
        {data.solution.sandSolution && (
          <SandSimulatorPage
            data={data.solution.sandSimulator.data}
            results={data.solution.sandSimulator.results}
            simulatorState={data.simulator}
          />
        )}
        {data.solution.pressureSolution && (
          <PressSimulatorPage
            data={data.solution.pressureSimulator.data}
            results={data.solution.pressureSimulator.results}
            simulatorState={data.simulator}
          />
        )}
        {data.wellbore3dImg && <Wellbore3dpage data={data} />}
        {data.tallyDesign.length > 0 && <TableTallyPage data={data} />}
        {data.designByPage?.length > 0 &&
          data.designByPage?.length !== 1 &&
          data.designByPage.map((itemsByPage, index) =>
            index === 0 && itemsByPage.length > 0 ? (
              <>
                {data.basicInfo.sla.id === 0 && (
                  <WbdFirstPageSRP
                    tools={itemsByPage}
                    key={index}
                    data={data}
                  />
                )}
                {data.basicInfo.sla.id === 1 &&
                  !data.basicInfo.bhaInfo?.sandLift && (
                    <WbdFirstPageESP tools={itemsByPage} key={index} />
                  )}
                {data.basicInfo.sla.id === 1 &&
                  data.basicInfo.bhaInfo?.sandLift && (
                    <WbdFirstPageEspSL tools={itemsByPage} key={index} />
                  )}
                {data.basicInfo.sla.id === 2 &&
                  !data.basicInfo.bhaInfo?.glPacker && (
                    <WbdFirstPageGL tools={itemsByPage} key={index} />
                  )}
                {data.basicInfo.sla.id === 2 &&
                  data.basicInfo.bhaInfo?.glPacker && (
                    <WbdFirstPageGlPacker tools={itemsByPage} key={index} />
                  )}
                {data.basicInfo.sla.id === 3 && (
                  <WbdFirstPagePCP tools={itemsByPage} key={index} />
                )}
              </>
            ) : index > 0 &&
              index < data.designByPage.length - 1 &&
              itemsByPage.length > 0 ? (
              <WbdSecondPage tools={itemsByPage} key={index} />
            ) : (
              index === data.designByPage.length - 1 &&
              itemsByPage.length > 0 && (
                <>
                  {data.basicInfo.bhaInfo?.horizontal ? (
                    <WbdLastPageHor
                      tools={itemsByPage}
                      key={index}
                      data={data}
                    />
                  ) : (
                    <WbdLastPageVert
                      tools={itemsByPage}
                      key={index}
                      data={data}
                    />
                  )}
                </>
              )
            )
          )}
        {data.designByPage?.length === 1 && (
          <WbdFirstPageGen
            tools={data.designByPage[0]}
            slaId={data.basicInfo.sla.id}
            data={data}
          />
        )}
      </>
    </Document>
  );
};
