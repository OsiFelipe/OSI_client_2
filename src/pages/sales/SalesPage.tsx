import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { AlertComponent, NavBar, ShowContent, Spinner } from "../../components";
import DataContext from "../../context/DataContext";
import PaginatorContext from "../../context/PaginatorContext";
import { useFetch } from "../../hooks";
import { ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import FileCopyIcon from "@mui/icons-material/FileCopy";

interface FetchResponse {
  success?: boolean;
  data: ProductProps[];
}

const dataGridStyles = {
  border: "1px solid rgb(251,171,53)",
  borderRadius: "10px",
  padding: "1%",
  backgroundColor: "#FFF",
};

export const SalesPage = () => {
  const { paginationModel, fetchPaginationModel } =
    useContext(PaginatorContext);
  const matches = useMediaQuery("(min-width:600px)");
  const { data, error, isLoading, pagination } = useFetch<FetchResponse>(
    "sales-paginate",
    paginationModel
  );
  const { isSuccess, isError, onResetValues } = useContext(DataContext);
  const navigate = useNavigate();
  const { getDateFromString } = useDate();

  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Order Date",
      renderHeader: () => <strong>{"Order Date"}</strong>,
      sortable: true,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        getDateFromString(params.row?.orderDate),
    },
    {
      field: "client",
      headerName: "Client",
      renderHeader: () => <strong>{"Client"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "wellName",
      headerName: "Well",
      renderHeader: () => <strong>{"Well"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "deliveryContact",
      headerName: "Delivery Contact",
      renderHeader: () => <strong>{"Delivery Contact"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "salesmanContact",
      headerName: "Salesman Contact",
      renderHeader: () => <strong>{"Salesman Contact"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "action",
      headerName: "ACTION",
      filterable: false,
      sortable: false,
      renderHeader: () => <strong>{"Action"}</strong>,
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/sales/edit/${params.row?.id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Duplicate">
              <IconButton onClick={() => navigate(`/sales/${params.row?.id}`)}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={() => navigate(`/sales/${params.row?.id}`)}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  let content: JSX.Element | JSX.Element[];

  const buttons = [
    {
      title: "New",
      action: () => {
        onResetValues();
        navigate("/sales/new/0");
      },
      icon: <AddBoxIcon />,
    },
  ];
  if (!data) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <NavBar title="Sales Orders" buttons={buttons} />
        <div className={styles.center}>
          <div style={{ height: "80vh" }} className={styles.techProposalForm}>
            <DataGrid
              slots={{ toolbar: GridToolbar }}
              density={matches ? "standard" : "compact"}
              style={dataGridStyles}
              rows={data.data}
              columns={columns}
              className={styles.dataTable}
              loading={isLoading}
              rowCount={+pagination?.totalRecords}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={fetchPaginationModel}
            />
          </div>
          {isSuccess && <AlertComponent type="success" />}
          {isError && <AlertComponent type="error" />}
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
