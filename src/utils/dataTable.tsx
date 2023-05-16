import { GridValueGetterParams, GridColDef } from "@mui/x-data-grid";

export const feeColumns: GridColDef[] = [
  {
    field: "user",
    headerName: "USER",
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.loan?.user?.name || "",
  },
  { field: "feeAmount", headerName: "AMOUNT", width: 80 },
  { field: "interestAmount", headerName: "INTEREST", width: 80 },
  { field: "totalAmount", headerName: "TOTAL", width: 80 },
  { field: "extraFee", headerName: "EXTRA", width: 80 },
  { field: "realAmount", headerName: "TOTAL REAL", width: 100 },
  { field: "payDate", headerName: "PAY DATE", width: 150 },
];

export const savingColumns: GridColDef[] = [
  {
    field: "user",
    headerName: "USER",
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.share?.user?.name || "",
  },
  {
    field: "amount",
    headerName: "AMOUNT",
    sortable: true,
    width: 80,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.share?.amount || "",
  },
  { field: "period", headerName: "PERIOD", width: 120 },
  {
    field: "payDate",
    headerName: "PAY DATE",
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.share?.payDate || "",
  },
];

export const balanceColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "date", headerName: "DATE", width: 120 },
  { field: "lastBalance", headerName: "LAST BALANCE", width: 120 },
  {
    field: "amount",
    headerName: "AMOUNT",
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.transaction?.amount || 0,
  },
  { field: "newBalance", headerName: "NEW BALANCE", width: 120 },
];

export const loanColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "user",
    headerName: "USER",
    sortable: true,
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.user?.name || "",
  },
  { field: "startDate", headerName: "START DATE", width: 120 },
  { field: "amount", headerName: "AMOUNT", width: 100 },
  { field: "interest", headerName: "INTEREST", width: 100 },
  { field: "termLimit", headerName: "TERM LIMIT", width: 100 },
];

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "name", headerName: "NAME", width: 160 },
  { field: "cc", headerName: "CC", width: 120 },
  { field: "email", headerName: "EMAIL", width: 250 },
];

export const draftLoanColumns: GridColDef[] = [
  { field: "id", headerName: "No", width: 60 },
  { field: "feeAmount", headerName: "AMOUNT", width: 160 },
  { field: "interestAmount", headerName: "INTEREST", width: 160 },
  { field: "totalAmount", headerName: "TOTAL", width: 160 },
  { field: "remain", headerName: "REMAIN", width: 160 },
  { field: "payDate", headerName: "PAY DATE", width: 160 },
];

export const sharingColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "amount", headerName: "AMOUNT", width: 100 },
  { field: "payDate", headerName: "PAY DATE", width: 160 },
];
