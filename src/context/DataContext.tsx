import { ExportType } from "export-from-json";
import { createContext } from "react";
import { initial_sales_state, initial_simulator_state } from "../utils/data";
import { SimulatorProps } from "../interfaces/interfaces";
import {
  DataProps,
  ClientProps,
  WellProps,
  ProductProps,
} from "../interfaces/interfaces";
import {
  basic_initial_state,
  tally_initial_state,
  initial_solution_state,
  initial_wbd_state,
} from "../utils/data";

interface Props {
  onUpdateBasicInfo: (item: string, newValue: any) => void;
  onUpdateSalesInfo: (item: string, newValue: any) => void;
  onUpdateBha: (item: string, newValue: any) => void;
  onUpdateSolution: (
    type: string,
    item: any,
    data?: any,
    simulator?: SimulatorProps
  ) => void;
  onUpdateTally: (index: number, newValue: any, onEditMode?: boolean) => void;
  onUpdateSalesProductList: (
    index: number,
    property: string,
    newValue: any
  ) => void;
  onAddProductToSales: (newItem: any) => void;
  onCancelEdition: () => void;
  onAddTool: (index?: number) => void;
  onAddInnerTool: (item: ProductProps, index: number) => void;
  onRemoveInnerTool: (index: number | null) => void;
  onAddCustomTool: (index?: number, newRow?: any) => void;
  onChangeMudWeight: (value: number) => void;
  onChangeTotalLength: (value: number) => void;
  onChangeTotalWeight: (value: number) => void;
  onChangeLastBottom: (value: number) => void;
  onDeleteTallyRow: (index: number) => void;
  onDeleteSalesRow: (index: number) => void;
  fetchDataTechProp: (id: number | string) => void;
  fetchDataTally: (id: number | string) => void;
  fetchDataClient: () => void;
  fetchDataWells: (clientId: number) => void;
  fetchDataProducts: () => void;
  fetchDataSales: (id: number | string) => void;
  onSaveProp: () => void;
  onEditprop: (techId: string) => void;
  onDeleteProp: (techId: string) => void;
  onSaveTally: () => void;
  onEditTally: (tallyId: string) => void;
  onDeleteTally: (tallyId: string) => void;
  onCreateClient: (item: string) => void;
  onEditClient: (id: number, item: string, active?: boolean) => void;
  onCreateWell: (values: any) => void;
  onEditWell: (values: any) => void;
  onCreateTool: (values: ProductProps) => void;
  onEditTool: (values: ProductProps, index?: number) => void;
  onCreateSales: () => void;
  onEditSales: (id: number | string) => void;
  onExportExcel: (format: ExportType, source?: String) => void;
  onCreatePdf: () => void;
  onResetValues: () => void;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onChangeW3d: (newImage: string) => void;
  data: DataProps;
  clientOptions: ClientProps[];
  wellOptions: WellProps[];
  productOptions: ProductProps[];
  isModalOpen: boolean;
  toSave: Boolean;
  orderIsReady: Boolean;
  isSuccess: Boolean;
  isError: Boolean;
}

const DataContext = createContext<Props>({
  onUpdateBasicInfo: () => {},
  onUpdateSalesInfo: () => {},
  onUpdateBha: () => {},
  onUpdateSolution: () => {},
  onUpdateTally: () => {},
  onUpdateSalesProductList: () => {},
  onAddProductToSales: () => {},
  onAddTool: () => {},
  onAddInnerTool: () => {},
  onRemoveInnerTool: () => {},
  onAddCustomTool: () => {},
  onChangeMudWeight: () => {},
  onChangeTotalLength: () => {},
  onChangeTotalWeight: () => {},
  onChangeLastBottom: () => {},
  onDeleteTallyRow: () => {},
  onDeleteSalesRow: () => {},
  onCancelEdition: () => {},
  fetchDataTechProp: () => {},
  fetchDataTally: () => {},
  fetchDataClient: () => {},
  fetchDataWells: () => {},
  fetchDataProducts: () => {},
  fetchDataSales: () => {},
  onSaveProp: () => {},
  onEditprop: () => {},
  onDeleteProp: () => {},
  onSaveTally: () => {},
  onEditTally: () => {},
  onDeleteTally: () => {},
  onCreateClient: () => {},
  onEditClient: () => {},
  onCreateWell: () => {},
  onEditWell: () => {},
  onCreateTool: () => {},
  onEditTool: () => {},
  onCreateSales: () => {},
  onEditSales: () => {},
  onExportExcel: () => {},
  onCreatePdf: () => {},
  onResetValues: () => {},
  onCloseModal: () => {},
  onOpenModal: () => {},
  onChangeW3d: () => {},
  clientOptions: [],
  wellOptions: [],
  productOptions: [],
  data: {
    basicInfo: basic_initial_state,
    salesInfo: initial_sales_state,
    solution: initial_solution_state,
    simulator: initial_simulator_state,
    tallyDesign: tally_initial_state,
    wellbore3dImg: "",
    wbdDesign: initial_wbd_state,
    designByPage: [],
  },
  isModalOpen: false,
  toSave: false,
  orderIsReady: false,
  isSuccess: false,
  isError: false,
});

export default DataContext;
