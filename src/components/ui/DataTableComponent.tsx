import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./ui.module.sass";

interface Props<T> {
  title?: string;
  rows: T[];
  columns: GridColDef[];
  height: number;
  width: string;
  action?: { name: string; func: (id: number) => void };
}

const dataGridStyles = {
  border: "2px solid #135C61",
  borderRadius: "10px",
  padding: "1%",
  // backgroundColor: "white",
};

export function DataTableComponent<T>({
  title,
  rows,
  columns,
  height,
  width,
  action,
}: Props<T>) {
  if (action) {
    let newAction = {
      field: "action",
      headerName: "ACTION",
      width: 100,
      renderCell: (params: any) => {
        return (
          <button
            className={styles.button}
            onClick={() => action.func(params.id)}
          >
            {action.name}
          </button>
        );
      },
    };
    columns = [newAction, ...columns];
  }
  return (
    <div style={{ height: 1000 }} className={styles.dataGrid}>
      <div className={styles.title}>{title}</div>
      <DataGrid
        style={dataGridStyles}
        rows={rows}
        columns={columns}
        autoPageSize
        className={styles.dataTable}
      />
    </div>
  );
}
