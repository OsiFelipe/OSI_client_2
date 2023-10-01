import { useEffect, useState } from "react";
import { AlertComponent, NavBar, ShowContent, Spinner } from "../../components";
import { useDate, useFetch, useRequest } from "../../hooks";
import { UserDataProps } from "../../interfaces/interfaces";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { Download } from "@mui/icons-material";
import styles from "../main.module.sass";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
  // const { paginationModel, fetchPaginationModel } =
  //   useContext(PaginatorContext);
  const { data, isLoading } = useFetch<FetchResponse>("client");
  const { handleRequest } = useRequest();
  const { getDateFromString } = useDate();
  const [wellsByClient, setWellsByClient] = useState([]);
  const [dataPullingReport, setDataPullingReport] = useState<PullingProps[]>(
    []
  );
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [isError, setIsError] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, 4000);
  }, [isError]);

  const fetchWellsByClientId = (idClient: number) => {
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
        setDataPullingReport(response.data);
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
          createPdfFile(response.data, name, download);
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
      console.log(e);
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

  let content: JSX.Element | JSX.Element[] = (
    <NavBar title="Pulling Reports" buttons={[]} />
  );
  if (!data) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <NavBar title="Pulling Reports" buttons={[]} />
        <div className={styles.pullingTableContainer}>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            density={matches ? "standard" : "compact"}
            style={dataGridStyles}
            rows={data.data}
            columns={clientColums}
            className={styles.pullingTable}
            loading={isLoading}
            paginationModel={{
              pageSize: 25,
              page: 0,
            }}
            // rowCount={+pagination?.totalRecords}
            onCellClick={(params) => fetchWellsByClientId(params.row.id)}
            getCellClassName={() => {
              return styles.cellClass;
            }}
            // paginationMode="server"
            // autoPageSize
            // paginationModel={paginationModel}
            // onPaginationModelChange={fetchPaginationModel}
          />
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            density={matches ? "standard" : "compact"}
            style={dataGridStyles}
            rows={wellsByClient}
            columns={wellColumns}
            className={styles.pullingTable}
            loading={isLoading}
            // rowCount={+pagination?.totalRecords}

            onCellClick={(params) => fetchPullingReports(params.row.id)}
            getCellClassName={() => {
              return styles.cellClass;
            }}
            // paginationMode="server"
            // autoPageSize
            // paginationModel={paginationModel}
            // onPaginationModelChange={fetchPaginationModel}
          />
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            density={matches ? "standard" : "compact"}
            style={dataGridStyles}
            rows={dataPullingReport}
            columns={columnsPullingReport}
            className={styles.pullingTable}
            loading={isLoading}
            autoPageSize
            // rowCount={+pagination?.totalRecords}
            // paginationMode="server"
            // paginationModel={paginationModel}
            // onPaginationModelChange={fetchPaginationModel}
          />
        </div>
        {isCreatingReport && <div className={styles.backdrop}></div>}
        {isError && <AlertComponent type="error" />}
      </>
    );
  }

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
