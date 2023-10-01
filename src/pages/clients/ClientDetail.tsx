import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { WellProps } from "../../interfaces/interfaces";
import { AlertComponent, NavBar, ShowContent, Spinner } from "../../components";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import styles from "../main.module.sass";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DataContext from "../../context/DataContext";

const dataGridStyles = {
  border: "1px solid rgb(90,100,119)",
  borderRadius: "10px",
  padding: "1%",
  marginTop: "5vh",
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
  const matches = useMediaQuery("(min-width:600px)");
  const { data, error, isLoading } = useFetch<FetchResponse>(
    `client-detail/${idClient}`
  );
  const [clientName, setClientName] = useState("");
  const [clientStatus, setClientStatus] = useState("Active");
  const { isSuccess, isError, onEditClient } = useContext(DataContext);

  useEffect(() => {
    if (data) {
      const {
        data: { name, active },
      } = data;
      setClientName(name);
      active ? setClientStatus("Active") : setClientStatus("Inactive");
    }
  }, [data]);

  const buttons = [
    {
      title: "Edit",
      action: () =>
        idClient &&
        onEditClient(
          parseInt(idClient),
          clientName,
          clientStatus === "Active" ? true : false
        ),
      icon: <EditIcon />,
      disabled: !idClient,
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
      data: { wells },
    } = data;
    content = (
      <>
        <NavBar title={clientName} buttons={buttons} />
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
                label="Client Name"
                variant="outlined"
                value={clientName}
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                onChange={(event) => setClientName(event.target.value)}
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
                value={clientStatus}
                onChange={(_, newValue) =>
                  (newValue === "Active" || newValue === "Inactive") &&
                  setClientStatus(newValue)
                }
                {...{
                  options: ["Active", "Inactive"],
                }}
                disablePortal
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Grid>
          </Grid>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            density={matches ? "standard" : "compact"}
            style={dataGridStyles}
            rows={wells}
            columns={columns}
            autoPageSize
            className={styles.dataTableClient}
          />
        </div>
        {isSuccess && <AlertComponent type="success" />}
        {isError && <AlertComponent type="error" />}
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
