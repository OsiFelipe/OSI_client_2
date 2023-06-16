import { Button } from "@mui/material";
import {
  AlertComponent,
  BasicInfoComponent,
  NavBar,
  PdfTallyFile,
  ShowContent,
  Spinner,
  TallyTable,
  TitleComponent,
  WBDDesign,
} from "../../components";
import { useFetch } from "../../hooks";
import { ClientProps, ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PDFView } from "../../components/pdf";
import SellIcon from "@mui/icons-material/Sell";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface TechProposalInfoProps {
  clients: ClientProps[];
  products: ProductProps[];
  customTools: ProductProps[];
}

interface FetchResponse {
  success?: boolean;
  data: TechProposalInfoProps;
}

export const TallyDesignForm = () => {
  let [searchParams] = useSearchParams();
  const pdf = searchParams.get("pdf");
  const { data, error, isLoading } = useFetch<FetchResponse>("tech-proposal");
  const [inEdit, setInEdit] = useState(false);
  const [inPdf, setInPdf] = useState(pdf || false);
  const { idTally } = useParams();
  const {
    toSave,
    onSaveTally,
    onEditTally,
    onCancelEdition,
    fetchDataTally,
    fetchDataProducts,
    onResetValues,
    onCreatePdf,
    isSuccess,
    isError,
    data: pdfData,
  } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (idTally && idTally !== "0") {
      fetchDataTally(parseInt(idTally));
      setInEdit(true);
    } else {
      onResetValues();
    }
  }, [idTally]);

  useEffect(() => {
    fetchDataProducts();
  }, []);

  const buttons = [
    {
      title: "Cancel",
      action: onCancelEdition,
      icon: <CancelIcon />,
      disabled: !!inPdf,
    },
    {
      title: "Order",
      action: () => navigate(`/sales/tally/${idTally}`),
      icon: <SellIcon />,
      disabled: !!!toSave,
    },
    {
      title: "Save",
      action: inEdit ? () => idTally && onEditTally(idTally) : onSaveTally,
      icon: <SaveIcon />,
      disabled: !!!toSave,
    },
    {
      title: !inPdf ? "To Pdf" : "Go Back",
      action: () => {
        onCreatePdf();
        setInPdf(!inPdf);
      },
      icon: !inPdf ? <PictureAsPdfIcon /> : <ArrowBackIosIcon />,
    },
  ];

  let content: JSX.Element | JSX.Element[];
  if (!data) {
    content = <Spinner />;
  } else {
    const products = data ? data.data.products : [];
    const customTools = data ? data.data.customTools : [];
    content = (
      <>
        <NavBar title="Tally & WBD" buttons={buttons} />
        <div className={styles.techProposalForm}>
          {inPdf ? (
            <PDFView
              fileName={pdfData.basicInfo.customName}
              children={<PdfTallyFile data={pdfData} />}
              action={pdf ? onCreatePdf : () => {}}
            />
          ) : (
            <>
              <BasicInfoComponent bhaInfo={false} />
              <TitleComponent title="Tally Design" />
              <TallyTable products={products} customTools={customTools} />
              <WBDDesign />
              <div className={styles.buttonProp}>
                <Button variant="contained" onClick={onCancelEdition}>
                  Cancel
                </Button>
                {inEdit ? (
                  <Button
                    variant="contained"
                    onClick={() => idTally && onEditTally(idTally)}
                    disabled={!!!toSave}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onSaveTally}
                    disabled={!!!toSave}
                  >
                    Save
                  </Button>
                )}
              </div>
            </>
          )}

          {isSuccess && <AlertComponent type="success" />}
          {isError && <AlertComponent type="error" />}
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
