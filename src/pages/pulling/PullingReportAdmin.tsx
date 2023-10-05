import { useContext, useEffect, useState } from "react";
import {
  AlertComponent,
  ModalComponent,
  NavBar,
  SearchInput,
  ShowContent,
  Spinner,
  UploadFileForm,
} from "../../components";
import { useDate, useFetch, useRequest } from "../../hooks";
import {
  ClientProps,
  PullingReportProps,
  UserDataProps,
  WellProps,
} from "../../interfaces/interfaces";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { Download } from "@mui/icons-material";
import styles from "../main.module.sass";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useFilter } from "../../hooks/useFilter";
import DataContext from "../../context/DataContext";

interface Props extends UserDataProps {
  id: number;
}

interface FetchResponse {
  success?: boolean;
  data: Props[];
}

interface PullingProps {
  id: number;
  active: boolean;
  customName: string;
  date: string;
  idClient: number;
  idWell: number;
  path: string;
}

const dataGridStyles = {
  border: "1px solid rgb(90,100,119)",
  borderRadius: "10px",
  padding: "1%",
  height: "75vh",
  width: "90%",
};

const iconButtonStyles = {
  backgroundColor: "rgb(90,100,119)",
  color: "white",
  marginRight: "5px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgb(251,171,53)",
  },
};

export const PullingReportAdmin = () => {
  const { data, isLoading } = useFetch<FetchResponse>("client");
  const { handleRequest } = useRequest();
  const { getDateFromString } = useDate();
  const [wellsByClient, setWellsByClient] = useState([]);
  const [wellquery, setWellQuery] = useState("");
  const [clientQuery, setClientQuery] = useState("");
  const [pullQuery, setPullQuery] = useState("");
  const [dataPullingReport, setDataPullingReport] = useState<PullingProps[]>(
    []
  );
  const { filteredData: clientData } = useFilter<ClientProps>(data?.data, {
    query: clientQuery,
    field: "name",
  });
  const { filteredData: wellData } = useFilter<WellProps>(wellsByClient, {
    query: wellquery,
    field: "name",
  });
  const { filteredData: pullingData } = useFilter<PullingProps>(
    dataPullingReport,
    {
      query: pullQuery,
      field: "customName",
    }
  );
  const [idClientSelected, setIdClientSelected] = useState(0);
  const [idWellSelected, setIdWellSelected] = useState(null);
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const { clientOptions, wellOptions, fetchDataWells, fetchDataClient } =
    useContext(DataContext);

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
      setIsSuccess(false);
    }, 4000);
  }, [isError, isSuccess]);

  useEffect(() => {
    fetchDataClient();
  }, []);

  const fetchWellsByClientId = (idClient: number) => {
    setIdClientSelected(idClient);
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `/well/client/${idClient}`, options })
      .then((response) => {
        setWellsByClient(response.data);
      })
      .catch((e) => setIsError(true));
  };

  const fetchPullingReports = (idWell: number) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `pulling-list/${idWell}`, options })
      .then((response) => {
        if (response.success) {
          setDataPullingReport(response.data);
        } else {
          setIsError(true);
        }
      })

      .catch((e) => setIsError(true));
  };

  const fetchPullingByKey = (key: string, name: string, download: boolean) => {
    if (key) {
      setIsCreatingReport(true);
      let options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ key }),
        headers: {
          responseType: "Buffer",
        },
      };
      handleRequest({ endpoint: "pdf-pulling-adm", options })
        .then((response) => {
          if (response.success) {
            createPdfFile(response.data, name, download);
          } else {
            setIsError(true);
          }
          setIsCreatingReport(false);
        })
        .catch((e) => {
          setIsError(true);
          setIsCreatingReport(false);
        });
    }
  };

  const createPdfFile = (
    data: { type: string; data: Buffer },
    name: string,
    download: boolean
  ) => {
    try {
      const url = window.URL.createObjectURL(
        new Blob([new Uint8Array(data.data).buffer], {
          type: "application/pdf;charset=utf-8",
        })
      );
      if (download) {
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      } else {
        window.open(url);
      }
      setIsCreatingReport(false);
    } catch (e) {
      setIsCreatingReport(false);
      setIsError(true);
    }
  };

  const handleUploadPulling = async ({
    client,
    well,
    file,
    customName,
  }: PullingReportProps) => {
    try {
      setIsCreatingReport(true);
      setIsModalOpen(false);
      let formData = new FormData();
      formData.append("client", JSON.stringify(client));
      formData.append("well", JSON.stringify(well));
      customName && formData.append("customName", customName);
      formData.append("file", file, file.name);
      const response = await fetch(
        process.env.REACT_APP_DEV_API + "/pulling-upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await response.json();
      if (res.success) {
        setIsCreatingReport(false);
        setIsSuccess(true);
      }
    } catch (e) {
      setIsCreatingReport(false);
      setIsError(true);
    }
  };

  const clientColums: GridColDef[] = [
    {
      field: "name",
      headerName: "Well",
      renderHeader: () => <strong>{"CLIENT"}</strong>,
      sortable: true,
      width: 270,
    },
  ];

  const wellColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Well",
      renderHeader: () => <strong>{"WELL"}</strong>,
      sortable: true,
      width: 300,
    },
  ];

  const columnsPullingReport: GridColDef[] = [
    {
      field: "edit",
      width: 80,
      renderHeader: () => <></>,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Open in a new Page">
              <IconButton
                sx={iconButtonStyles}
                size="small"
                onClick={() =>
                  fetchPullingByKey(
                    params.row.path,
                    params.row.customName,
                    false
                  )
                }
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton
                sx={iconButtonStyles}
                size="small"
                onClick={() =>
                  fetchPullingByKey(
                    params.row.path,
                    params.row.customName,
                    true
                  )
                }
              >
                <Download fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      disableColumnMenu: true,
    },
    {
      field: "customName",
      headerName: "Name",
      renderHeader: () => <strong>{"Pulling Report"}</strong>,
      sortable: true,
      width: 200,
      renderCell: (params: any) => {
        return (
          <Tooltip title={params.row.customName}>
            <span>{params.row.customName}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      renderHeader: () => <strong>{"Date"}</strong>,
      sortable: true,
      width: 100,
      renderCell: (params: any) => {
        return <span>{getDateFromString(params.row.date)}</span>;
      },
    },
  ];

  const buttons = [
    {
      title: "Upload",
      action: () => setIsModalOpen(true),
      icon: <DriveFolderUploadIcon />,
      disabled: false,
    },
  ];

  let content: JSX.Element | JSX.Element[] = (
    <NavBar title="Pulling Reports" buttons={[]} />
  );
  if (!clientData) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <NavBar title="Pulling Reports" buttons={buttons} />
        <Grid container sx={{ marginTop: "2vh", marginLeft: "2vh" }}>
          <Grid item xs={12} md={4}>
            <SearchInput
              label="Search Client"
              value={clientQuery}
              setValue={setClientQuery}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              label="Search Well"
              value={wellquery}
              setValue={setWellQuery}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              label="Search Pulling"
              value={pullQuery}
              setValue={setPullQuery}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DataGrid
              density={matches ? "standard" : "compact"}
              style={dataGridStyles}
              rows={clientData}
              columns={clientColums}
              className={styles.pullingTable}
              loading={isLoading}
              onCellClick={(params) => {
                fetchWellsByClientId(params.row.id);
              }}
              getCellClassName={() => {
                return styles.cellClass;
              }}
              pagination
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DataGrid
              density={matches ? "standard" : "compact"}
              style={dataGridStyles}
              rows={wellData}
              columns={wellColumns}
              className={styles.pullingTable}
              loading={isLoading}
              onCellClick={(params) => {
                fetchPullingReports(params.row.id);
                setIdWellSelected(params.row.id);
              }}
              getCellClassName={() => {
                return styles.cellClass;
              }}
              pagination
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DataGrid
              density={matches ? "standard" : "compact"}
              style={dataGridStyles}
              rows={pullingData}
              columns={columnsPullingReport}
              className={styles.pullingTable}
              loading={isLoading}
              autoPageSize
              pagination
            />
          </Grid>
        </Grid>
        {isCreatingReport && <div className={styles.backdrop}></div>}
        {isSuccess && <AlertComponent type="success" />}
        {isError && <AlertComponent type="error" />}
        {isModalOpen && data && (
          <ModalComponent
            modalContent={
              <UploadFileForm
                clientOptions={clientOptions}
                wellOptions={wellOptions}
                fetchDataWells={fetchDataWells}
                onUploadFile={(values: PullingReportProps) => {
                  handleUploadPulling(values);
                }}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
              />
            }
          />
        )}
      </>
    );
  }

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
