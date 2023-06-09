import { Document } from "@react-pdf/renderer";
import {
  TableTallyPage,
  WbdSecondPage,
  WbdLastPageVert,
  WbdFirstPageESP,
  WbdFirstPageGL,
  WbdFirstPageSRP,
  WbdFirstPageGlPacker,
  WbdFirstPageEspSL,
  WbdLastPageHor,
  WbdFirstPagePCP,
} from "../pages";
import { DataProps } from "../../../interfaces/interfaces";
import { WbdFirstPageGen } from "../pages/wbd/WbdFirstPageGen";

export const PdfTallyFile = ({ data }: { data: DataProps }) => {
  return (
    <Document>
      <>
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
                    <WbdFirstPageESP
                      tools={itemsByPage}
                      data={data}
                      key={index}
                    />
                  )}
                {data.basicInfo.sla.id === 1 &&
                  data.basicInfo.bhaInfo?.sandLift && (
                    <WbdFirstPageEspSL
                      tools={itemsByPage}
                      data={data}
                      key={index}
                    />
                  )}
                {data.basicInfo.sla.id === 2 &&
                  !data.basicInfo.bhaInfo?.glPacker && (
                    <WbdFirstPageGL
                      tools={itemsByPage}
                      data={data}
                      key={index}
                    />
                  )}
                {data.basicInfo.sla.id === 2 &&
                  data.basicInfo.bhaInfo?.glPacker && (
                    <WbdFirstPageGlPacker
                      tools={itemsByPage}
                      data={data}
                      key={index}
                    />
                  )}
                {data.basicInfo.sla.id === 3 && (
                  <WbdFirstPagePCP
                    tools={itemsByPage}
                    data={data}
                    key={index}
                  />
                )}
              </>
            ) : index < data.designByPage.length - 1 &&
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
