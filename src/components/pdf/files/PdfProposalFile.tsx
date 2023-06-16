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
import React from "react";

export const PdfProposalFile = ({ data }: { data: DataProps }) => {
  return (
    <Document>
      <>
        <PresentationPage data={data} />
        <BasicInfoPage data={data} />
        {data.solution.gasSolution ? (
          <GasSimulatorPage
            data={data.solution.gasSimulator.data}
            results={data.solution.gasSimulator.results}
            simulatorState={data.simulator}
          />
        ) : null}
        {data.solution.sandSolution ? (
          <SandSimulatorPage
            data={data.solution.sandSimulator.data}
            results={data.solution.sandSimulator.results}
            simulatorState={data.simulator}
          />
        ) : null}
        {data.solution.pressureSolution ? (
          <PressSimulatorPage
            data={data.solution.pressureSimulator.data}
            results={data.solution.pressureSimulator.results}
            simulatorState={data.simulator}
          />
        ) : null}
        {data.wellbore3dImg ? <Wellbore3dpage data={data} /> : null}
        {data.tallyDesign.length > 0 ? <TableTallyPage data={data} /> : null}
        {data.designByPage?.length > 0 &&
          data.designByPage?.length !== 1 &&
          data.designByPage.map((itemsByPage, index) =>
            index === 0 && itemsByPage.length > 0 ? (
              <React.Fragment key={index}>
                {data.basicInfo.sla.id === 0 ? (
                  <WbdFirstPageSRP
                    tools={itemsByPage}
                    key={index}
                    data={data}
                  />
                ) : null}
                {data.basicInfo.sla.id === 1
                  ? !data.basicInfo.bhaInfo?.sandLift && (
                      <WbdFirstPageESP
                        tools={itemsByPage}
                        data={data}
                        key={index}
                      />
                    )
                  : null}
                {data.basicInfo.sla.id === 1
                  ? data.basicInfo.bhaInfo?.sandLift && (
                      <WbdFirstPageEspSL
                        tools={itemsByPage}
                        data={data}
                        key={index}
                      />
                    )
                  : null}
                {data.basicInfo.sla.id === 2
                  ? !data.basicInfo.bhaInfo?.glPacker && (
                      <WbdFirstPageGL
                        tools={itemsByPage}
                        data={data}
                        key={index}
                      />
                    )
                  : null}
                {data.basicInfo.sla.id === 2
                  ? data.basicInfo.bhaInfo?.glPacker && (
                      <WbdFirstPageGlPacker
                        tools={itemsByPage}
                        data={data}
                        key={index}
                      />
                    )
                  : null}
                {data.basicInfo.sla.id === 3 ? (
                  <WbdFirstPagePCP
                    tools={itemsByPage}
                    data={data}
                    key={index}
                  />
                ) : null}
              </React.Fragment>
            ) : index > 0 &&
              index < data.designByPage.length - 1 &&
              itemsByPage.length > 0 ? (
              <WbdSecondPage tools={itemsByPage} data={data} key={index} />
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
        {data.designByPage?.length === 1 ? (
          <WbdFirstPageGen
            tools={data.designByPage[0]}
            slaId={data.basicInfo.sla.id}
            data={data}
          />
        ) : null}
      </>
    </Document>
  );
};
