import { Document } from "@react-pdf/renderer";
import { SalesItemProp } from "../../../interfaces/interfaces";
import { SalesFormPage } from "../pages";

export const PdfSalesOrderFile = ({ data }: { data: SalesItemProp }) => {
  return (
    <Document>
      <SalesFormPage data={data} />
    </Document>
  );
};
