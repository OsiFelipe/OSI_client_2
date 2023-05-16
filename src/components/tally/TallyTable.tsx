import { useReducer, useContext, useState } from "react";
import { ProductProps } from "../../interfaces/interfaces";
import {
  ProductSelectorByName,
  ProductSelectorByPN,
  StatusSelector,
  QuantityField,
} from ".";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DataContext from "../../context/DataContext";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { ModalComponent } from "../layout/ModalComponent";
import { AddCustomToolForm } from "../common/AddCustomToolForm";
import BusinessIcon from "@mui/icons-material/Business";
import BuildIcon from "@mui/icons-material/Build";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ArticleIcon from "@mui/icons-material/Article";
import { ProductForm } from "../common/ProductForm";
import { initial_tool_state } from "../../utils/data";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import DataArrayOutlinedIcon from "@mui/icons-material/DataArrayOutlined";
import styles from "../components.module.sass";
import { AddProductForm } from "../common/AddProductForm";

export const TallyTable = ({
  products,
  customTools,
}: {
  products: ProductProps[];
  customTools: ProductProps[];
}) => {
  const [isModalOpenCreateTool, setIsModalOpenCreatetool] =
    useState<Boolean>(false);
  const [isModalOpenInnerTool, setIsModalOpenInnerTool] =
    useState<Boolean>(false);
  const [isModalOpenInnerDetail, setIsModalOpenInnerDetail] =
    useState<Boolean>(false);
  const [toolToAddInner, setToolToAddInner] = useState<number | null>(null);
  const [toolToEdit, setToolToEdit] =
    useState<ProductProps>(initial_tool_state);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [toolToRemoveInner, setToolToRemoveInner] = useState<number | null>(
    null
  );
  const {
    data: { tallyDesign },
    productOptions,
    onEditTool,
    onUpdateTally,
    onAddTool,
    onAddInnerTool,
    onRemoveInnerTool,
    onDeleteTallyRow,
    onAddCustomTool,
    onChangeMudWeight,
    onChangeTotalLength,
    onChangeTotalWeight,
    onChangeLastBottom,
    onExportExcel,
    onOpenModal,
    onCloseModal,
    isModalOpen,
  } = useContext(DataContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getMudWeight = (): number => {
    let weight: number = 0;
    const mudJointRow = tallyDesign.filter((item) => item.tailJoint);
    if (mudJointRow.length > 0) {
      const mudJointId = 0.2033353,
        mudJointLenght = mudJointRow[0].length,
        sandDensity = 130;
      let volume =
        Math.PI *
        Math.pow(mudJointId / 2, 2) *
        mudJointLenght *
        mudJointRow[0].quantity;
      weight = Math.round(sandDensity * volume);
    }
    onChangeMudWeight(weight);
    return weight;
  };

  const getTotalWeight = (): number => {
    let totalWeight = getMudWeight();
    for (let i = 0; i < tallyDesign.length; i++) {
      totalWeight += tallyDesign[i].totalWeight || 0;
    }
    onChangeTotalWeight(parseFloat(totalWeight.toFixed(2)));
    return parseFloat(totalWeight.toFixed(2));
  };

  const getTotalLenght = (): number => {
    let totalLength = 0;
    for (let i = 0; i < tallyDesign.length; i++) {
      totalLength += tallyDesign[i].length * tallyDesign[i].quantity;
      if (i === tallyDesign.length - 1)
        onChangeLastBottom(tallyDesign[i].bottom || 0);
    }
    onChangeTotalLength(parseFloat(totalLength.toFixed(2)));
    return parseFloat(totalLength.toFixed(2));
  };

  return (
    <>
      <div className={styles.buttonTally}>
        <ButtonGroup variant="outlined">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onAddTool(0)}
          >
            <BuildIcon fontSize="small" sx={{ mr: 1 }} />
            OSI Tool
          </Button>
          <Button variant="outlined" onClick={() => onAddCustomTool(0)}>
            <BusinessIcon fontSize="small" sx={{ mr: 1 }} />
            Custom Tool
          </Button>
          <Button
            variant="outlined"
            onClick={() => onExportExcel("csv")}
            disabled={!!!(tallyDesign.length > 0)}
          >
            <DocumentScannerIcon fontSize="small" sx={{ mr: 1 }} />
            Export CSV
          </Button>
          <Button
            variant="outlined"
            onClick={() => onExportExcel("xls")}
            disabled={!!!(tallyDesign.length > 0)}
          >
            <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
            Export XLS
          </Button>
        </ButtonGroup>
      </div>
      {tallyDesign.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.tableTally}>
            <thead>
              <tr>
                <th>Actions</th>
                <th>Add Inner Tools</th>
                <th>Add OSI Tools</th>
                <th>Add Custom Tools</th>
                <th>Position</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>Supplier</th>
                <th>Top Thread Connection</th>
                <th>Bottom Thread Connection</th>
                <th>Status</th>
                <th>{"Max. OD (in)"}</th>
                <th>{"Body OD (in)"}</th>
                <th>{"Length(ft)"}</th>
                <th>{"QTY"}</th>
                <th>{"Top (ft)"}</th>
                <th>{"Bottom (ft)"}</th>
                <th>{"Weight (lb)"}</th>
              </tr>
            </thead>
            <tbody>
              {tallyDesign.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles["grid-col"]}>
                      <Tooltip title="Remove row">
                        <IconButton
                          size="small"
                          sx={{ width: "2rem" }}
                          onClick={() => onDeleteTallyRow(index)}
                        >
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: "#CD1719" }}
                          />
                        </IconButton>
                      </Tooltip>
                      {!!!item.id ? (
                        <IconButton
                          disabled
                          size="small"
                          sx={{ width: "2rem" }}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : (
                        <>
                          {item.osi ? (
                            <Tooltip title="Edit Product">
                              <IconButton
                                size="small"
                                sx={{ width: "2rem" }}
                                onClick={() => {
                                  setToolToEdit(item);
                                  setIndexToEdit(index);
                                  setIsModalOpenCreatetool(true);
                                }}
                              >
                                <EditIcon sx={{ color: "#2F75B5" }} />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Edit Custom Tool">
                              <IconButton
                                size="small"
                                sx={{ width: "2rem" }}
                                onClick={() => {
                                  setToolToEdit(item);
                                  setIndexToEdit(index);
                                  onOpenModal();
                                }}
                              >
                                <EditIcon sx={{ color: "#2F75B5" }} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["grid-col"]}>
                      {!!!item.id || item.innerTools || !item.osi ? (
                        <IconButton size="small" sx={{ width: "80%" }} disabled>
                          <FormatLineSpacingIcon />
                        </IconButton>
                      ) : (
                        <Tooltip title="Add Inner tool">
                          <IconButton
                            size="small"
                            sx={{ width: "80%" }}
                            onClick={() => {
                              setToolToAddInner(index);
                              setIsModalOpenInnerTool(true);
                            }}
                          >
                            <FormatLineSpacingIcon sx={{ color: "#4BB543" }} />
                          </IconButton>
                        </Tooltip>
                      )}
                      {!item.innerTools ? (
                        <IconButton size="small" sx={{ width: "80%" }} disabled>
                          <DataArrayOutlinedIcon />
                        </IconButton>
                      ) : (
                        <Tooltip title="Inner Tools Detail">
                          <IconButton
                            size="small"
                            sx={{ width: "2rem" }}
                            onClick={() => {
                              item.innerTools && setToolToEdit(item.innerTools);
                              setToolToRemoveInner(index);
                              setIsModalOpenInnerDetail(true);
                            }}
                          >
                            <DataArrayOutlinedIcon sx={{ color: "#4BB543" }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["grid-col"]}>
                      <Tooltip title="Add OSI">
                        <IconButton
                          size="small"
                          sx={{ width: "2rem" }}
                          onClick={() => {
                            onAddTool(index);
                          }}
                        >
                          <NorthEastIcon sx={{ color: "#FBAB53" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add OSI">
                        <IconButton
                          size="small"
                          sx={{ width: "2rem" }}
                          onClick={() => {
                            onAddTool(index + 1);
                          }}
                        >
                          <SouthEastIcon sx={{ color: "#FBAB53" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <div className={styles["grid-col"]}>
                      <Tooltip title="Add Custom">
                        <IconButton
                          size="small"
                          sx={{ width: "2rem" }}
                          onClick={() => {
                            onAddCustomTool(index);
                          }}
                        >
                          <NorthEastIcon sx={{ color: "rgb(90,100,119)" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add Custom">
                        <IconButton
                          sx={{ width: "2rem" }}
                          size="small"
                          onClick={() => {
                            onAddCustomTool(index + 1);
                          }}
                        >
                          <SouthEastIcon sx={{ color: "rgb(90,100,119)" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                  <td>{index}</td>
                  <td>
                    {item.osi ? (
                      <ProductSelectorByPN
                        options={products}
                        onSelectPN={(newValue: any) => {
                          onUpdateTally(index, { ...item, ...newValue }, true);
                          forceUpdate();
                        }}
                        value={item}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {item.osi ? (
                      <ProductSelectorByName
                        options={products}
                        onSelectName={(newValue: any) => {
                          onUpdateTally(index, { ...item, ...newValue }, true);
                          forceUpdate();
                        }}
                        value={item}
                      />
                    ) : (
                      <ProductSelectorByName
                        options={customTools}
                        onSelectName={(newValue: any) => {
                          onUpdateTally(index, { ...item, ...newValue }, true);
                          forceUpdate();
                        }}
                        value={item}
                      />
                    )}
                  </td>
                  <td>{item?.supplier || "-"}</td>
                  <td>{item?.topThreadConnection || "-"}</td>
                  <td>{item?.bottomThreadConnection || "-"}</td>
                  <td>
                    {item?.id !== 0 ? (
                      <StatusSelector
                        value={item.status}
                        onUpdateStatus={(newValue) => {
                          onUpdateTally(index, { ...item, status: newValue });
                          forceUpdate();
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{item?.maxOD || "-"}</td>
                  <td>{item?.bodyOD || "-"}</td>
                  <td>
                    {item.length && item.quantity
                      ? item.length * item.quantity
                      : item.length}
                  </td>
                  <td>
                    {item?.id !== 0 ? (
                      <QuantityField
                        value={item.quantity}
                        onChangeQTY={(newValue) => {
                          onUpdateTally(
                            index,
                            { ...item, quantity: newValue },
                            true
                          );
                          forceUpdate();
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {item.top !== undefined && item.top >= 0 ? item.top : "-"}
                  </td>
                  <td>
                    {item.bottom !== undefined && item.bottom >= 0
                      ? item.bottom
                      : "-"}
                  </td>
                  <td>{item?.totalWeight}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={14}>Total Weight of Mud Joints full with sand</td>
                <td>
                  <strong>{getMudWeight()}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan={10}>Total</td>
                <td colSpan={4}>
                  <strong>{getTotalLenght()}</strong>
                </td>
                <td>
                  <strong>{getTotalWeight()}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.buttonTally}>
            <ButtonGroup variant="outlined">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onAddTool()}
              >
                <BuildIcon fontSize="small" sx={{ mr: 1 }} />
                OSI Tool
              </Button>
              <Button variant="outlined" onClick={() => onAddCustomTool()}>
                <BusinessIcon fontSize="small" sx={{ mr: 1 }} />
                Custom Tool
              </Button>
              <Button
                variant="outlined"
                onClick={() => onExportExcel("csv")}
                disabled={!!!(tallyDesign.length > 0)}
              >
                <DocumentScannerIcon fontSize="small" sx={{ mr: 1 }} />
                Export CSV
              </Button>
              <Button
                variant="outlined"
                onClick={() => onExportExcel("xls")}
                disabled={!!!(tallyDesign.length > 0)}
              >
                <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
                Export XLS
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalComponent
          modalContent={
            <AddCustomToolForm
              toolValues={toolToEdit}
              onEditCustomTool={(newValues) => {
                onEditTool(newValues, indexToEdit);
                forceUpdate();
              }}
              onCancel={() => {
                setToolToEdit(initial_tool_state);
                onCloseModal();
              }}
            />
          }
        />
      )}
      {isModalOpenInnerDetail && (
        <ModalComponent
          modalContent={
            <ProductForm
              productValues={toolToEdit}
              onCancel={() => {
                setToolToEdit(initial_tool_state);
                setIsModalOpenInnerDetail(false);
              }}
              disabled={true}
              onRemoveInnerTool={() => {
                onRemoveInnerTool(toolToRemoveInner);
                setToolToRemoveInner(null);
                setIsModalOpenInnerDetail(false);
              }}
            />
          }
        />
      )}
      {isModalOpenCreateTool && (
        <ModalComponent
          modalContent={
            <ProductForm
              productValues={toolToEdit}
              onEdit={(values: ProductProps) => {
                onEditTool(values, indexToEdit);
                setIsModalOpenCreatetool(false);
              }}
              onCancel={() => {
                setToolToEdit(initial_tool_state);
                setIsModalOpenCreatetool(false);
              }}
            />
          }
        />
      )}
      {isModalOpenInnerTool && toolToAddInner !== null && (
        <ModalComponent
          modalContent={
            <AddProductForm
              products={productOptions}
              onCancel={() => {
                setToolToAddInner(null);
                setIsModalOpenInnerTool(false);
              }}
              onAddProduct={(value) => {
                onAddInnerTool(value, toolToAddInner);
                setIsModalOpenInnerTool(false);
                setToolToAddInner(null);
                forceUpdate();
              }}
            />
          }
        />
      )}
    </>
  );
};
