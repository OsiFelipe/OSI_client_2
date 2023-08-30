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
import PaginatorContext from "../../context/PaginatorContext";
import { useFetch } from "../../hooks";
import { ProductProps, WellProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { initial_well_state } from "../../utils/data";
import { IconButton, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

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

export const WellPage = () => {
  const { paginationModel, fetchPaginationModel } =
    useContext(PaginatorContext);
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const { data, error, isLoading, fetchData, pagination } =
    useFetch<FetchResponse>("well-paginate", paginationModel);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [wellToEdit, setWellToEdit] = useState<WellProps>(initial_well_state);
  const [isCreateWell, setIsCreateWell] = useState<Boolean>(false);
  const { isSuccess, isError, onCreateWell, onEditWell } =
    useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "Action",
      renderHeader: () => <strong>{"ACTION"}</strong>,
      width: 100,
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
