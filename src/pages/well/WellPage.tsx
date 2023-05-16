import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useContext, useState } from "react";
import {
  AddWellForm,
  AlertComponent,
  ModalComponent,
  NavBar,
  ShowContent,
  Spinner,
} from "../../components";
import DataContext from "../../context/DataContext";
import { useFetch } from "../../hooks";
import { ProductProps, WellProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { initial_well_state } from "../../utils/data";
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

export const WellPage = () => {
  const { data, error, isLoading, fetchData } = useFetch<FetchResponse>("well");
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [wellToEdit, setWellToEdit] = useState<WellProps>(initial_well_state);
  const [isCreateWell, setIsCreateWell] = useState<Boolean>(false);
  const { isSuccess, isError, onCreateWell, onEditWell } =
    useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "Action",
      renderHeader: () => <strong>{"Edit"}</strong>,
      width: 100,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setIsCreateWell(false);
                setWellToEdit(params.row);
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
      headerName: "Well",
      renderHeader: () => <strong>{"WELL"}</strong>,
      sortable: true,
      width: 220,
    },
    {
      field: "client",
      headerName: "Client",
      renderHeader: () => <strong>{"CLIENT"}</strong>,
      sortable: true,
      width: 220,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.client.name || "",
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

  const buttons = [
    {
      title: "New",
      action: () => {
        setIsCreateWell(true);
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
        <NavBar title="Wells" buttons={buttons} />
        <div className={styles.center}>
          <div
            style={{ height: "75vh", width: "70vw" }}
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
                <AddWellForm
                  data={wellToEdit || null}
                  onEditWell={
                    !isCreateWell
                      ? (values: WellProps) => {
                          let newWellValues = {
                            id: values.id,
                            name: values.name,
                            idClient: values.client?.id,
                            contact: values.contact,
                            phoneNumber: values.phoneNumber,
                          };
                          onEditWell(newWellValues);
                          fetchData();
                          setIsModalOpen(false);
                        }
                      : undefined
                  }
                  onAddWell={
                    isCreateWell
                      ? (values: WellProps) => {
                          onCreateWell(values);
                          fetchData();
                          setIsModalOpen(false);
                        }
                      : undefined
                  }
                  onCancel={() => {
                    setWellToEdit(initial_well_state);
                    setIsModalOpen(false);
                    setIsCreateWell(false);
                  }}
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
