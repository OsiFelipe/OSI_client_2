import {
  NavBar,
  PdfSalesOrderFile,
  ShowContent,
  Spinner,
} from "../../components";
import { useFetch } from "../../hooks";
import { SalesItemProp } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import { useParams } from "react-router-dom";
import { PDFView } from "../../components/pdf";

interface FetchResponse {
  success?: boolean;
  data: SalesItemProp;
}

export const SalesPrintPage = () => {
  const { idSales } = useParams();
  const { data, error, isLoading } = useFetch<FetchResponse>(
    `sales/${idSales}`
  );

  let content: JSX.Element | JSX.Element[];
  if (!data) {
    content = <Spinner />;
  } else {
    const pdfData = data.data;
    content = (
      <>
        <NavBar title="Sales Order" buttons={[]} />
        <div className={styles.techProposalForm}>
          <PDFView children={<PdfSalesOrderFile data={pdfData} />} />
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
