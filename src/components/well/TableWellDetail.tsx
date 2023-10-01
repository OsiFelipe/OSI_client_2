import React from "react";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { ProposalProps } from "../../interfaces/interfaces";
import styles from "../components.module.sass";
import { useDate } from "../../hooks";

interface Props {
  proposals: ProposalProps[];
  tallies: ProposalProps[];
}
const dataGridStyles = {
  border: "1px solid rgb(90,100,119)",
  borderRadius: "10px",
  padding: "1%",
  marginTop: "5vh",
  marginRight: "1rem",
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

export const TableWellDetail = ({ proposals, tallies }: Props) => {
  const navigate = useNavigate();
  const { getDateFromString } = useDate();
  const matches = useMediaQuery("(min-width:600px)");

  const columnsTech: GridColDef[] = [
    {
      field: "detail",
      headerName: "Detail",
      renderHeader: () => <></>,
      width: 100,
      renderCell: (params: any) => {
        return (
          <Tooltip title="Detail">
            <IconButton
              onClick={() => {
                navigate(`/tech/${params.row.id}`);
              }}
              sx={iconButtonStyles}
              size="small"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "customName",
      headerName: "TECHNICAL PROPOSAL",
      renderHeader: () => <strong>{"TECHNICAL PROPOSAL"}</strong>,
      sortable: true,
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
  ];
  const columnsTally: GridColDef[] = [
    {
      field: "detail",
      headerName: "Action",
      renderHeader: () => <strong>{"DETAIL"}</strong>,
      width: 100,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                navigate(`/tech/${params.row.id}`);
              }}
              sx={iconButtonStyles}
              size="small"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "customName",
      headerName: "TALLY DESIGN",
      renderHeader: () => <strong>{"TALLY DESIGN"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      renderHeader: () => <strong>{"DATE"}</strong>,
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        getDateFromString(params.row?.date),
    },
  ];
  return (
    <div className={styles.tableContainerTech}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        density={matches ? "standard" : "compact"}
        style={dataGridStyles}
        rows={proposals}
        columns={columnsTech}
        autoPageSize
        className={styles.dataTableTech}
      />
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        density={matches ? "standard" : "compact"}
        style={dataGridStyles}
        rows={tallies}
        columns={columnsTally}
        autoPageSize
        className={styles.dataTableTech}
      />
    </div>
  );
};
