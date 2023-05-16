import { useContext, useEffect, useState } from "react";
import {
  AlertComponent,
  NavBar,
  SalesOrderForm,
  SalesOrderTable,
  ShowContent,
} from "../../components";
import DataContext from "../../context/DataContext";
import styles from "../main.module.sass";
import { useParams } from "react-router-dom";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { Button } from "@mui/material";

export const SalesFormPage = () => {
  const { source, id } = useParams();
  const [inEdit, setInEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    isSuccess,
    isError,
    fetchDataTally,
    fetchDataTechProp,
    fetchDataProducts,
    fetchDataSales,
    onCreateSales,
    onEditSales,
    orderIsReady,
  } = useContext(DataContext);

  useEffect(() => {
    fetchDataProducts();
    if (source === "tally" && id) {
      id && fetchDataTally(id);
      setInEdit(true);
    } else if (source === "tech") {
      id && fetchDataTechProp(id);
      setInEdit(true);
    } else if (source === "new") {
      setInEdit(false);
    } else if (source === "edit") {
      id && fetchDataSales(id);
      setEditMode(true);
    }
  }, [id]);

  const buttons = [
    {
      title: "Send",
      action: editMode ? () => id && onEditSales(id) : onCreateSales,
      icon: <AttachEmailIcon />,
      disabled: !orderIsReady,
    },
  ];

  let content: JSX.Element | JSX.Element[];

  content = (
    <>
      <NavBar title="Sales Orders" buttons={buttons} />
      <div className={styles.center}>
        <SalesOrderForm inEdit={inEdit} />
        <SalesOrderTable />
        <div style={{ marginBottom: "10%" }}>
          <Button
            variant="outlined"
            onClick={editMode ? () => id && onEditSales(id) : onCreateSales}
            disabled={!orderIsReady}
          >
            Send
          </Button>
        </div>
      </div>
      {isSuccess && <AlertComponent type="success" />}
      {isError && <AlertComponent type="error" />}
    </>
  );

  return <ShowContent error={""} isLoading={false} content={content} />;
};
