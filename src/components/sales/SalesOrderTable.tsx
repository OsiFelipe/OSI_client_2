import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useReducer, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { QuantityField } from "../tally/QuantityField";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import { TitleComponent } from "../ui/TitleComponent";
import { ModalComponent } from "../layout/ModalComponent";
import { AddProductForm } from "../common/AddProductForm";
import styles from "../components.module.sass";

export const SalesOrderTable = () => {
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const {
    data: { salesInfo },
    productOptions,
    onDeleteSalesRow,
    onUpdateSalesProductList,
    onExportExcel,
    onAddProductToSales,
  } = useContext(DataContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return (
    <div>
      <TitleComponent title="Product List" />
      <div className={styles.buttonTally}>
        <ButtonGroup
          variant="outlined"
          orientation={`${matches ? `horizontal` : `vertical`}`}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsModalProductOpen(true);
            }}
          >
            <AddIcon fontSize="small" sx={{ mr: 1 }} />
            Add Product
          </Button>
          <Button
            variant="outlined"
            onClick={() => onExportExcel("csv", "sales")}
          >
            <DocumentScannerIcon fontSize="small" sx={{ mr: 1 }} />
            Export CSV
          </Button>
          <Button
            variant="outlined"
            onClick={() => onExportExcel("xls", "sales")}
          >
            <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
            Export XLS
          </Button>
        </ButtonGroup>
      </div>
      {salesInfo.productList.length > 0 ? (
        <>
          <table className={styles.tableSales}>
            <thead>
              <tr>
                <th>Delete</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              {salesInfo.productList.map((item, index) => (
                <React.Fragment key={index}>
                  {item.osi && item.id !== 0 && (
                    <tr key={index}>
                      <td>
                        <div className={styles.grid}>
                          <Tooltip title="Remove row">
                            <IconButton onClick={() => onDeleteSalesRow(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                      <td>{item.partNumber}</td>
                      <td>{item.name || item.description}</td>
                      <td>
                        <QuantityField
                          value={item.quantity}
                          onChangeQTY={(newValue) => {
                            onUpdateSalesProductList(
                              index,
                              "quantity",
                              newValue
                            );
                            forceUpdate();
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>Please add Products to the Order</div>
      )}
      {isModalProductOpen && (
        <ModalComponent
          modalContent={
            <AddProductForm
              products={productOptions}
              onCancel={() => setIsModalProductOpen(false)}
              onAddProduct={(value) => {
                onAddProductToSales(value);
                setIsModalProductOpen(false);
                forceUpdate();
              }}
            />
          }
        />
      )}
    </div>
  );
};
