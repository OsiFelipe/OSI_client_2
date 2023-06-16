import React from "react";
import { Page, StyleSheet, Text } from "@react-pdf/renderer";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Line from "../components/Line";
import { Header } from "../components/Header";
import { DataProps } from "../../../interfaces/interfaces";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    paddingTop: 40,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
    borderBottomColor: "rgb(251,171,53)",
  },
});

export const TableTallyPage = ({
  data: { basicInfo, tallyDesign, mudWeight, totalLenght, totalWeight },
}: {
  data: DataProps;
}) => {
  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Header title={basicInfo.client.name} subtitle={basicInfo.well.name} />
      <Text style={styles.title}>Tally Design</Text>
      <React.Fragment>
        <Table>
          <Table.Header>
            <Table.TableHeaderCellMain>Description</Table.TableHeaderCellMain>
            <Table.HeaderCell>Top Thread Connection</Table.HeaderCell>
            <Table.HeaderCell>Bottom Thread Connection</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Max OD (in)</Table.HeaderCell>
            <Table.HeaderCell>Body OD (in)</Table.HeaderCell>
            <Table.HeaderCell>Length (ft)</Table.HeaderCell>
            <Table.HeaderCell>Top (ft) MD</Table.HeaderCell>
            <Table.HeaderCell>Bottom (ft) MD</Table.HeaderCell>
            <Table.HeaderCell>Weight (lb)</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <>
              {tallyDesign.map((item) => (
                <React.Fragment key={item.id}>
                  {item.id !== 0 && (
                    <Table.Row>
                      <Table.CellMain>
                        {item.name || item.description}{" "}
                        {item.tailJoint && `QTY ${item.quantity}`}
                      </Table.CellMain>
                      <Table.Cell>{item.topThreadConnection || "-"}</Table.Cell>
                      <Table.Cell>
                        {item.bottomThreadConnection || "-"}
                      </Table.Cell>
                      <Table.Cell>{item?.status?.name || "-"}</Table.Cell>
                      <Table.Cell>{item.maxOD || "-"}</Table.Cell>
                      <Table.Cell>{item.bodyOD || "-"}</Table.Cell>
                      <Table.Cell>
                        {item.length && item.quantity
                          ? (item.length * item.quantity).toFixed(2)
                          : item.length}
                      </Table.Cell>
                      <Table.Cell>{item.top}</Table.Cell>
                      <Table.Cell>{item.bottom}</Table.Cell>
                      <Table.Cell>
                        {item.quantity && item.weight
                          ? (item.weight * item.quantity).toFixed(2)
                          : item.weight}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              ))}
              <Table.Row>
                <Table.Cell>
                  Total Weight of Mud Joints full with sand
                </Table.Cell>
                <Table.Cell>{mudWeight}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Length</Table.Cell>
                <Table.Cell>{totalLenght}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Weight</Table.Cell>
                <Table.Cell>{totalWeight}</Table.Cell>
              </Table.Row>
            </>
          </Table.Body>
        </Table>
        <Line color="yellow" />
      </React.Fragment>
      <Footer />
    </Page>
  );
};
