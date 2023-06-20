import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { WellProps } from "../../interfaces/interfaces";
import { NavBar, ShowContent, Spinner } from "../../components";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../main.module.sass";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import LoupeIcon from "@mui/icons-material/Loupe";
import { IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const dataGridStyles = {
  border: "1px solid #135C61",
  borderRadius: "10px",
  marginTop: "5vh",
};

interface Props {
  id: number;
  name: string;
  wells: WellProps[];
  active: boolean;
  updatedAt: string;
}

interface FetchResponse {
  success?: boolean;
  data: Props;
}

export const ClientDetail = () => {
  const navigate = useNavigate();
  const { idClient } = useParams();
  const { data, error, isLoading } = useFetch<FetchResponse>(
    `client-detail/${idClient}`
  );
  const buttons = [
    {
      title: "Edit",
      action: () => {},
      icon: <EditIcon />,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "detail",
      headerName: "Action",
      renderHeader: () => <strong>{"DETAIL"}</strong>,
      width: 80,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                navigate(`/well/${params.row.id}`);
              }}
            >
              <OpenInNewIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Well",
      renderHeader: () => <strong>{"WELL"}</strong>,
      sortable: true,
      width: 350,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row?.name || "";
      },
      renderCell: (params: any) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/well/${params.row.id}`);
            }}
          >
            {params.row?.name || ""}
          </div>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      renderHeader: () => <strong>{"CONTACT"}</strong>,
      width: 220,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      renderHeader: () => <strong>{"PHONE NUMBER"}</strong>,
      width: 220,
    },
  ];
  let content: JSX.Element | JSX.Element[];

  if (!data) {
    content = <Spinner />;
  } else {
    const {
      data: { name, wells },
    } = data;
    content = (
      <>
        <NavBar title={name} buttons={buttons} />
        <div className={styles.infoForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography mt={2} variant="h6">
                Client Information
              </Typography>
              <Divider />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                value={name}
                sx={{ width: "100%" }}
                onChange={(event) =>
                  console.log("customName", event.target.value)
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value="Active"
                onChange={(_, newValue) =>
                  (newValue === "Active" || newValue === "Inactive") &&
                  console.log(newValue)
                }
                {...{
                  options: ["Active", "Inactive"],
                }}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Grid>
          </Grid>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            style={dataGridStyles}
            rows={wells}
            columns={columns}
            autoPageSize
            className={styles.dataTableClient}
          />
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
