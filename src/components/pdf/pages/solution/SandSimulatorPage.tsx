import React from "react";
import { Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import {
  SandSimulatorProps,
  SandSimulatorResultProps,
  SimulatorProps,
} from "../../../../interfaces/interfaces";

const styles = StyleSheet.create({
  page: {
    paddingTop: "50px",
    fontSize: 14,
  },
  title: {
    fontSize: 15,
    marginBottom: 0,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  gridcol: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "40px",
    marginRight: "140px",
  },
  imageScreen: {
    width: "150px",
    marginLeft: 100,
  },
  col1: {
    marginTop: 10,
    marginLeft: 50,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    marginTop: 30,
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "0.5px solid black",
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
  },
  tableRowMain: {
    margin: "auto",
    flexDirection: "row",
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2F75B5",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRight: "0.5px solid black",
    borderTopWidth: 0,
  },
  tableColTitle: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRight: "0.5px solid black",
    borderTopWidth: 0,
  },
  tableColMainInput: {
    width: "90%",
    borderStyle: "solid",
    color: "white",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColMain: {
    width: "90%",
    borderStyle: "solid",
    color: "white",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 3,
    fontFamily: "Times-Roman",
  },
  tableCellMax: {
    margin: "auto",
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    fontFamily: "Times-Roman",
    color: "red",
  },
});

interface Props {
  data: SandSimulatorProps;
  results: SandSimulatorResultProps;
  simulatorState: SimulatorProps;
}

export const SandSimulatorPage = ({ data, results, simulatorState }: Props) => {
  return (
    <Page style={styles.page}>
      <Header title={"Sand Simulator"} subtitle={""} />
      {simulatorState.sand.tubingScreen && (
        <Text style={styles.title}>Tubing Screen Calculator</Text>
      )}
      {simulatorState.sand.superPerf && (
        <Text style={styles.title}>Super Perf Calculator</Text>
      )}
      {simulatorState.sand.pumpGuard && (
        <Text style={styles.title}>Pump guard Calculator</Text>
      )}

      <View style={styles.grid}>
        <View style={styles.col1}>
          <View style={styles.table}>
            <View style={styles.tableRowMain}>
              <View style={styles.tableColMainInput}>
                <Text style={styles.tableCell}>INPUT DATA</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>
                  Production Of total Liquid barre per day
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.bfpd}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BFPD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Percent of Run Time</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.percentageRuntime}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>%</Text>
              </View>
            </View>
            {simulatorState.sand.tubingScreen && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Selected Tubing Screen</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {data.selectedTubingScreen}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>(NA)</Text>
                </View>
              </View>
            )}
            {simulatorState.sand.superPerf && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Selected Super Perf</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.selectedSuperPerf}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>(NA)</Text>
                </View>
              </View>
            )}
            {simulatorState.sand.pumpGuard && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Selected Pump Guard</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.selectedPumbGuard}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>(NA)</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Slot</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.slotPg}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>slots</Text>
                  </View>
                </View>
              </>
            )}
            {simulatorState.sand.superPerf && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Slot</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.slotSp}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>slots</Text>
                </View>
              </View>
            )}
            {simulatorState.sand.tubingScreen && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Slot</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.slot}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>slots</Text>
                </View>
              </View>
            )}
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Well Clasification</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.wellClasification}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Open Area of Screen</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.openAreaOfScreen}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  in<sup>2</sup>
                </Text>
              </View>
            </View>
            {simulatorState.sand.tubingScreen && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}># Tubing Screen:</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {data.numberOfTubingScreen}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Qty</Text>
                </View>
              </View>
            )}
            {simulatorState.sand.superPerf && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}># Tubing Screen:</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {data.numberOfTubingScreen}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Qty</Text>
                </View>
              </View>
            )}
            {simulatorState.sand.pumpGuard && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}># Pump Guard:</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.numberOfPumpGuard}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Qty</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableRowMain}>
              <View style={styles.tableColMain}>
                <Text style={styles.tableCell}>CALCULATED RESULTS </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Size Of Sand</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{results.sizeOfSand}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Mesh</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Total Open Area of Screen</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {results.totalOpenAreaOfScreen}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  in<sup>2</sup>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>
                  1440 minute per day *% of time
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{results.minutePerDay}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>min/day</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>
                  Production per minute of run
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {results.productionPerMinuteOfRun}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>bbl/min</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Production cubic Inches</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {results.productionCubicInches}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  in<sup>3</sup>/min
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>
                  Production inch by Screen opening
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {results.productionInchByOpening}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in/sec</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          {simulatorState.sand.pumpGuard && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/sand/pump_guard.png`}
              fixed
            />
          )}
          {simulatorState.sand.superPerf && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/sand/super_perf.png`}
              fixed
            />
          )}
          {simulatorState.sand.tubingScreen && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/sand/tubing_screen.png`}
              fixed
            />
          )}
        </View>
      </View>
      <View style={styles.grid}>
        <Image
          cache
          style={styles.imageScreen}
          src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/sand/screen_arrow.png`}
          fixed
        />
        <View style={styles.col1}>
          <Text style={styles.tableCellMax}>
            {results.productionInchByOpening} in/sec - Fluid Velocity through
            Screen
          </Text>
          <Text style={styles.tableCellMax}>
            {results.maxByTs} in/sec - Max. by TS
          </Text>
        </View>
      </View>
      <Footer />
    </Page>
  );
};
