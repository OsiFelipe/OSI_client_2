import { Button } from "@mui/material";
import {
  AlertComponent,
  BasicInfoComponent,
  CombinedChart,
  InputExcelFile,
  NavBar,
  PdfProposalFile,
  ShowContent,
  SolutionComponent,
  Spinner,
  TallyTable,
  TitleComponent,
  WBDDesign,
  Wellbore3d,
} from "../../components";
import { useFetch } from "../../hooks";
import { ClientProps, ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import DataContext from "../../context/DataContext";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { PDFView } from "../../components/pdf";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useScreenshot } from "usescreenshot-react";
import SellIcon from "@mui/icons-material/Sell";
import SimulatorContext from "../../context/SimulatorContext";
import { initial_prod_chart } from "../../utils/data";
import { useDate } from "../../hooks/useDate";
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

export const TechDesignForm = () => {
  const { idTech } = useParams();
  let [searchParams] = useSearchParams();
  const { getDateFromString } = useDate();
  const pdf = searchParams.get("pdf");
  const { takeScreenshot } = useScreenshot();
  const ref = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useFetch<FetchResponse>("tech-proposal");
  const [inEdit, setInEdit] = useState(false);
  const [inPdf, setInPdf] = useState(false);
  const [isThereProdImage, setIsThereProdImage] = useState(false);
  const navigate = useNavigate();

  const {
    fetchDataClient,
    toSave,
    onSaveProp,
    onEditprop,
    onUpdateBasicInfo,
    onCancelEdition,
    onCreatePdf,
    fetchDataTechProp,
    fetchDataProducts,
    onResetValues,
    isSuccess,
    isError,
    data: dataProposal,
  } = useContext(DataContext);

  const { fetchTechSolution } = useContext(SimulatorContext);

  useEffect(() => {
    fetchDataClient();
    if (idTech && idTech !== "0") {
      fetchDataTechProp(parseInt(idTech));
      fetchTechSolution(parseInt(idTech));
      setInEdit(true);
      dataProposal.basicInfo.prodImage && setIsThereProdImage(true);
      if (pdf) setInPdf(true);
    } else {
      setInEdit(false);
      setInPdf(false);
      onResetValues();
    }

    return () => {};
  }, [idTech]);

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
      action: () => navigate(`/sales/tech/${idTech}`),
      icon: <SellIcon />,
      disabled: !!!toSave,
    },
    {
      title: "Save",
      action: inEdit ? () => idTech && onEditprop(idTech) : onSaveProp,
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
  const handleReadExcelFile = (data: any) => {
    let labels = [];
    let dataset1 = [],
      dataset2 = [],
      dataset3 = [];
    for (let i = 1; i < data.length; i++) {
      labels.push(getDateFromString(data[i][0]));
      dataset1.push(data[i][1]);
      dataset2.push(data[i][2]);
      dataset3.push(data[i][3]);
    }
    setIsThereProdImage(true);
    onUpdateBasicInfo("prodChartData", {
      labels,
      dataset1,
      dataset2,
      dataset3,
    });
  };

  const handleRemoveImage = () => {
    onUpdateBasicInfo("prodChartData", initial_prod_chart);
    onUpdateBasicInfo("prodImage", "");
    setIsThereProdImage(false);
  };

  const getImage = () => {
    if (!ref.current) {
      return;
    }
    takeScreenshot(ref.current, {
      backgroundColor: null,
      logging: false,
    })
      .then((res) => onUpdateBasicInfo("prodImage", res))
      .catch(console.log);
  };

  let content: JSX.Element | JSX.Element[];
  if (!data) {
    content = <Spinner />;
  } else {
    const products = data ? data.data.products : [];
    const customTools = data ? data.data.customTools : [];
    content = (
      <>
        <NavBar title="Technical Proposal" buttons={buttons} />
        <div className={styles.techProposalForm}>
          {inPdf ? (
            <PDFView
              fileName={dataProposal.basicInfo.customName}
              children={<PdfProposalFile data={dataProposal} />}
              action={pdf ? onCreatePdf : () => {}}
            />
          ) : (
            <>
              <BasicInfoComponent />
              <TitleComponent title="Production History" />
              <InputExcelFile
                onReadExcelData={handleReadExcelFile}
                onGetImage={getImage}
                disabled={!isThereProdImage}
                onRemoveImage={handleRemoveImage}
              />
              <div ref={ref} className={styles.center}>
                <CombinedChart
                  prodChartData={dataProposal.basicInfo.prodChartData}
                />
              </div>
              <SolutionComponent />
              <TitleComponent title="3D Wellbore" />
              <Wellbore3d />
              <TitleComponent title="Tally Design" />
              <TallyTable products={products} customTools={customTools} />
              <WBDDesign />
              <div className={styles.buttonProp}>
                <Button
                  startIcon={<CancelIcon />}
                  variant="outlined"
                  onClick={onCancelEdition}
                >
                  Cancel
                </Button>
                {inEdit ? (
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => idTech && onEditprop(idTech)}
                    disabled={!!!toSave}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={onSaveProp}
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
