import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import {
  AddClientForm,
  AlertComponent,
  ModalComponent,
  NavBar,
  ShowContent,
  Spinner,
} from "../../components";
import DataContext from "../../context/DataContext";
import PaginatorContext from "../../context/PaginatorContext";
import { useFetch } from "../../hooks";
import { ClientProps, ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

interface FetchResponse {
  success?: boolean;
  data: ProductProps[];
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

export const ClientPage = () => {
  const { paginationModel, fetchPaginationModel } =
    useContext(PaginatorContext);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { data, error, isLoading, fetchData, pagination } =
    useFetch<FetchResponse>("client-paginate", paginationModel);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [clientToEdit, setClientToEdit] = useState<ClientProps>({
    id: 0,
    name: "",
  });
  const [isCreateClient, setIsCreateClient] = useState(false);
  const { isSuccess, isError, onCreateClient, onEditClient } =
    useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "Action",
      renderHeader: () => <></>,
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Tooltip title="Detail">
              <IconButton
                onClick={() => {
                  navigate(`/client/${params.row.id}`);
                }}
                sx={iconButtonStyles}
                size="small"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setIsCreateClient(false);
                  setClientToEdit(params.row);
                  setIsModalOpen(true);
                }}
                sx={iconButtonStyles}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Client",
      renderHeader: () => <strong>{"CLIENT"}</strong>,
      sortable: true,
      width: 220,
    },
  ];

  let content: JSX.Element | JSX.Element[];

  const buttons = [
    {
      title: "New",
      action: () => {
        setIsCreateClient(true);
        setIsModalOpen(true);
      },
      icon: <AddBoxIcon />,
    },
  ];
  if (!data) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <NavBar title="Clients" buttons={buttons} />
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
          {isModalOpen && (
            <ModalComponent
              modalContent={
                <AddClientForm
                  value={!isCreateClient ? clientToEdit.name : null}
                  onCancel={() => setIsModalOpen(false)}
                  onEditClient={
                    !isCreateClient
                      ? (values) => {
                          onEditClient(clientToEdit.id, values);
                          setIsModalOpen(false);
                          fetchData();
                        }
                      : undefined
                  }
                  onAddClient={
                    isCreateClient
                      ? (name) => {
                          onCreateClient(name);
                          setIsModalOpen(false);
                          setIsCreateClient(false);
                        }
                      : undefined
                  }
                />
              }
            />
          )}
          {isSuccess && <AlertComponent type="success" />}
          {isError && <AlertComponent type="error" />}
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
