import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(90,100,119)",
    color: "#fff",
    padding: 3,
  },
  headerCell: {
    fontWeight: "heavy",
    fontSize: 10,
    white: "#fff",
    width: "11.11%",
    textAlign: "center",
  },
  headerCellMain: {
    fontWeight: "heavy",
    fontSize: 10,
    white: "#fff",
    width: "30%",
    textAlign: "center",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  cell: {
    width: "11.11%",
    textAlign: "center",
  },
  cellMain: {
    width: "30%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 1px",
    borderBottom: "1px solid black",
  },
});

const Table = ({ children }: { children: any }) => (
  <View style={styles.table}>{children}</View>
);

const TableHeader = ({ children }: { children: any }) => (
  <View style={styles.header}>{children}</View>
);

const TableHeaderCell = ({ children }: { children: any }) => (
  <Text style={styles.headerCell}>{children}</Text>
);

const TableHeaderCellMain = ({ children }: { children: any }) => (
  <Text style={styles.headerCellMain}>{children}</Text>
);

const TableBody = ({ children }: { children: any }) => (
  <View style={styles.body}>{children}</View>
);

const TableRow = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

const TableCell = ({ children }: { children: any }) => (
  <Text style={styles.cell}>{children}</Text>
);

const TableCellMain = ({ children }: { children: any }) => (
  <Text style={styles.cellMain}>{children}</Text>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.TableHeaderCellMain = TableHeaderCellMain;
Table.Cell = TableCell;
Table.CellMain = TableCellMain;

export default Table;
