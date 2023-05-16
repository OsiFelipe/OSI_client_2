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
import { useFetch } from "../../hooks";
import { ClientProps, ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface FetchResponse {
  success?: boolean;
  data: ProductProps[];
}

const dataGridStyles = {
  border: "2px solid #135C61",
  borderRadius: "10px",
  padding: "1%",
  backgroundColor: "#F1ECE7",
};

export const ClientPage = () => {
  const { data, error, isLoading, fetchData } =
    useFetch<FetchResponse>("client");
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
      renderHeader: () => <strong>{"Edit"}</strong>,
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setIsCreateClient(false);
                setClientToEdit(params.row);
                setIsModalOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
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
          <div
            style={{ height: "83vh", width: "50vw" }}
            className={styles.techProposalForm}
          >
            <DataGrid
              slots={{ toolbar: GridToolbar }}
              style={dataGridStyles}
              rows={data.data}
              columns={columns}
              autoPageSize
              className={styles.dataTable}
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
