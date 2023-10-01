import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useContext, useState } from "react";
import {
  AlertComponent,
  ModalComponent,
  NavBar,
  ProductForm,
  ShowContent,
  Spinner,
} from "../../components";
import DataContext from "../../context/DataContext";
import PaginatorContext from "../../context/PaginatorContext";
import { useFetch } from "../../hooks";
import { ProductProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import EditIcon from "@mui/icons-material/Edit";
import { initial_tool_state } from "../../utils/data";
import AddBoxIcon from "@mui/icons-material/AddBox";

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

export const ProductPage = () => {
  const { paginationModel, fetchPaginationModel } =
    useContext(PaginatorContext);
  const matches = useMediaQuery("(min-width:600px)");
  const { data, error, isLoading, fetchData, pagination } =
    useFetch<FetchResponse>("product-paginate", paginationModel);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [toolToEdit, setToolToEdit] =
    useState<ProductProps>(initial_tool_state);
  const [isCreateTool, setIsCreatetool] = useState(false);
  const { isSuccess, isError, onCreateTool, onEditTool } =
    useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "Action",
      renderHeader: () => <></>,
      width: 100,
      renderCell: (params: any) => {
        return (
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setIsCreatetool(false);
                setToolToEdit(params.row);
                setIsModalOpen(true);
              }}
              sx={iconButtonStyles}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "partNumber",
      headerName: "Part Number",
      renderHeader: () => <strong>{"PART NUMBER"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "name",
      headerName: "Description",
      renderHeader: () => <strong>{"DESCRIPTION"}</strong>,
      sortable: true,
      width: 250,
      valueGetter: (params: GridValueGetterParams) => params.row?.name || "",
    },
    {
      field: "topThreadConnection",
      headerName: "Top Thread Connection",
      renderHeader: () => <strong>{"Top Thread Connection"}</strong>,
      sortable: true,
      width: 200,
    },
    {
      field: "bottomThreadConnection",
      headerName: "Bottom Thread Connection",
      renderHeader: () => <strong>{"Bottom Thread Connection"}</strong>,
      width: 180,
    },
    {
      field: "maxOD",
      headerName: "Max. OD",
      renderHeader: () => <strong>{"Max. OD (in)"}</strong>,
      width: 120,
    },
    {
      field: "bodyOD",
      headerName: "Body OD",
      renderHeader: () => <strong>{"Body OD (in)"}</strong>,
      width: 120,
    },
    {
      field: "length",
      headerName: "Lenght",
      renderHeader: () => <strong>{"Length(ft)"}</strong>,
      width: 120,
    },
    {
      field: "weight",
      headerName: "Weight",
      renderHeader: () => <strong>{"Weight (lb)"}</strong>,
      width: 120,
    },
  ];

  const buttons = [
    {
      title: "New",
      action: () => {
        setIsCreatetool(true);
        setIsModalOpen(true);
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
        <NavBar title="OSI Products" buttons={buttons} />
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
                <ProductForm
                  productValues={toolToEdit}
                  onEdit={
                    !isCreateTool
                      ? (values: ProductProps) => {
                          onEditTool(values);
                          setIsModalOpen(false);
                          fetchData();
                        }
                      : undefined
                  }
                  onCreatetool={
                    isCreateTool
                      ? (values: ProductProps) => {
                          onCreateTool(values);
                          setIsModalOpen(false);
                          fetchData();
                        }
                      : undefined
                  }
                  onCancel={() => {
                    setToolToEdit(initial_tool_state);
                    setIsModalOpen(false);
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
