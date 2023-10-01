import { useContext, useState } from "react";
import { NavBar, ShowContent, Spinner } from "../../components";
import AuthContext from "../../context/AuthContext";
import { useDate, useFetch, useRequest } from "../../hooks";
import { UserDataProps } from "../../interfaces/interfaces";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import PaginatorContext from "../../context/PaginatorContext";
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

export const PullingReportClient = () => {
  // const { paginationModel, fetchPaginationModel } =
  //   useContext(PaginatorContext);
  const { handleRequest } = useRequest();
  const { getDateFromString } = useDate();
  const { clientId, isLoading } = useContext(AuthContext);
  const { data, pagination } = useFetch<FetchResponse>(
    `well-client/${clientId}`
  );
  const matches = useMediaQuery("(min-width:600px)");
  const [dataPullingReport, setDataPullingReport] = useState<PullingProps[]>(
    []
  );

  const fetchPullingReports = (idWell: number) => {
    let options: RequestInit = {
      method: "GET",
    };
    handleRequest({ endpoint: `pulling-client/${idWell}`, options })
      .then((response) => {
        setDataPullingReport(response.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchPullingByKey = (key: string, name: string, download: boolean) => {
    if (key) {
      let options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ key }),
        headers: {
          responseType: "Buffer",
        },
      };
      handleRequest({ endpoint: "pdf-pulling", options })
        .then((response) => {
          createPdfFile(response.data, name, download);
        })
        .catch((e) => console.log(e));
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
    } catch (e) {
      console.log(e);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Well",
      renderHeader: () => <strong>{"WELL"}</strong>,
      sortable: true,
      width: 500,
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
      width: 260,
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
      width: 200,
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
            columns={columns}
            className={styles.pullingTable}
            loading={isLoading}
            rowCount={+pagination?.totalRecords}
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
      </>
    );
  }

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
