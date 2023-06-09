import { IconButton, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  AlertComponent,
  DialogComponent,
  NavBar,
  ShowContent,
  Spinner,
} from "../../components";
import { useDate, useFetch } from "../../hooks";
import { TechListProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SellIcon from "@mui/icons-material/Sell";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface FetchResponse {
  success?: boolean;
  data: TechListProps[];
}

const dataGridStyles = {
  border: "2px solid #135C61",
  borderRadius: "10px",
  padding: "1%",
  backgroundColor: "#F1ECE7",
};

export const TallyDesignList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, fetchData } =
    useFetch<FetchResponse>("tally-detail");
  const { onResetValues, fetchDataTally, onDeleteTally, isSuccess, isError } =
    useContext(DataContext);
  const { getDateFromString } = useDate();
  const [idToDelete, setIdToDelete] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "client",
      headerName: "Client",
      renderHeader: () => <strong>{"CLIENT"}</strong>,
      sortable: true,
      width: 220,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.well.client.name || "",
    },
    {
      field: "well",
      headerName: "Well",
      renderHeader: () => <strong>{"WELL"}</strong>,
      sortable: true,
      width: 220,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.well.name || "",
    },
    {
      field: "customName",
      headerName: "Description",
      renderHeader: () => <strong>{"DESCRIPTION"}</strong>,
      width: 300,
    },
    {
      field: "date",
      headerName: "Date",
      renderHeader: () => <strong>{"DATE"}</strong>,
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        getDateFromString(params.row?.date),
    },
    {
      field: "action",
      headerName: "Action",
      renderHeader: () => <strong>{"ACTION"}</strong>,
      width: 270,
      filterable: false,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={() => navigate(`/tally/${params.row?.id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Duplicate">
              <IconButton
                onClick={() => {
                  fetchDataTally(params.row?.id);
                  navigate("/tally/0");
                }}
              >
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Order">
              <IconButton
                onClick={() => navigate(`/sales/tally/${params.row?.id}`)}
              >
                <SellIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={() => navigate(`/tally/${params.row?.id}?pdf=true`)}
            >
              <PrintIcon />
            </IconButton>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setIdToDelete(params.row?.id);
                  setIsOpenAlert(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const buttons = [
    {
      title: "New",
      action: () => {
        onResetValues();
        navigate("/tally/0");
      },
      icon: <AddBoxIcon />,
    },
  ];
  let content: JSX.Element | JSX.Element[];
  if (!data) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <NavBar title="Tally & WBD Designs" buttons={buttons} />
        <div className={styles.center}>
          <div
            style={{ height: "75vh", width: "70vw" }}
            className={styles.techProposalForm}
          >
            <DataGrid
              style={dataGridStyles}
              rows={data.data}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              autoPageSize
              className={styles.dataTable}
            />
          </div>
          {isSuccess && <AlertComponent type="success" />}
          {isError && <AlertComponent type="error" />}
        </div>
        {isOpenAlert && (
          <DialogComponent
            type="error"
            modalContent={<div>Are you sure you want to remove this item?</div>}
            onAccept={() => {
              onDeleteTally(idToDelete);
              setIdToDelete("");
              setIsOpenAlert(false);
              fetchData();
            }}
            onCancel={() => {
              setIsOpenAlert(false);
              setIdToDelete("");
            }}
          />
        )}
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
