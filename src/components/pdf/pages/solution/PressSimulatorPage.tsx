import React from "react";
import { Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import {
  PressureSimulatorProps,
  PressureSimulatorResultProps,
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
  image: {
    width: "60px",
    marginLeft: 0,
    marginRight: 50,
    marginTop: 10,
  },
  imageContainer: {
    marginLeft: 0,
    marginRight: 10,
    marginTop: 10,
  },
  imageScreen: {
    width: "150px",
    marginLeft: 50,
    marginTop: 50,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  col1: {
    marginTop: 10,
  },
  gridcol: {
    display: "flex",
    flexDirection: "column",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    marginTop: 20,
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
  tableColMain: {
    width: "70%",
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
    fontWeight: "bold",
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    fontFamily: "Times-Roman",
    color: "red",
  },
  tableCellMaxDT: {
    margin: "auto",
    fontWeight: "bold",
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 30,
    fontFamily: "Times-Roman",
    color: "red",
  },
});

interface Props {
  data: PressureSimulatorProps;
  results: PressureSimulatorResultProps;
  simulatorState: SimulatorProps;
}

export const PressSimulatorPage = ({
  data,
  results,
  simulatorState,
}: Props) => {
  return (
    <Page style={styles.page}>
      <Header title={"Pressure Simulator"} subtitle={""} />
      {simulatorState.pressure.dipTube && (
        <Text style={styles.title}>Pressure Drop Through the Dip Tube</Text>
      )}
      {simulatorState.pressure.tubingScreenDP && (
        <Text style={styles.title}>Pressure Drop Through the Screen</Text>
      )}
      <View style={styles.grid}>
        <View style={styles.col1}>
          <View style={styles.table}>
            <View style={styles.tableRowMain}>
              <View style={styles.tableColMain}>
                <Text style={styles.tableCell}>INPUT DATA</Text>
              </View>
            </View>
            {simulatorState.pressure.tubingScreenDP && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}># Screens</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.numberOfTubingScreen}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Diameter (in)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.diameter}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Slot Size</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.slotSize}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Open Area (in<sup>2</sup>)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.openArea}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Screen Length (ft)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.screenLength}</Text>
                  </View>
                </View>
              </>
            )}
            {simulatorState.pressure.dipTube && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Reference Pressure [PIP] (psi)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.pip}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Delta P</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.deltaP}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Reference Depth (ft)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.refDepth}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Reservoir Pressure (psi)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.resPressure}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Oil Production (BOPD)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.bopd}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Water Production (BWPD)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.bwpd}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Gas Production (MSCFD)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.gasRate}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Produced GOR (SCF/STB)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.gor}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Liquid Production (BFPD)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.bfpd}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>BHT (F)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.temperature}</Text>
                  </View>
                </View>
              </>
            )}
            <View style={styles.table}>
              <View style={styles.tableRowMain}>
                <View style={styles.tableColMain}>
                  <Text style={styles.tableCell}>CALCULATED RESULTS </Text>
                </View>
              </View>
              {simulatorState.pressure.tubingScreenDP && (
                <>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Screen Aperture (ft)</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.screenAperture}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Fr. Free Area</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.freeArea}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>
                        Fluid Density (lb/ft<sup>3</sup>)
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.fluidDensity}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>
                        Fluid Velocity (ft/s)
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.fluidVelocity}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}># Reynolds</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.reynolds}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Discharge Coeff.</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.dischargeCoefficient}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Loss Press Coeff. K</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.lossPressCoeff}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Loss Pressure</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.lossPressure}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              {simulatorState.pressure.dipTube && (
                <>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Flow Regime</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.flowRegime}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Relative Roughness</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {results.relativeRoughness}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Reynolds</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.reynolds}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>E/D</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.ed}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Friction Factor</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.f}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColTitle}>
                      <Text style={styles.tableCell}>Delta P (psi)</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{results.deltaP}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.col1}>
          <View style={styles.table}>
            {simulatorState.pressure.tubingScreenDP && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Fuid Rate (BFPD)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.bfpd}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Water Rate (BWPD)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.wCut}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Water Cut (%)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.wCut}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>API</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.api}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Specific gravity W</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.sp}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Fluid Viscosity (cP)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.viscocity}</Text>
                  </View>
                </View>
              </>
            )}
            {simulatorState.pressure.dipTube && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>I.D. (in)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.diameter}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Length (ft)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.dipTubeLength}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>API</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.api}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>SGw</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.spw}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>SGg</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.sp}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>SGo</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.spo}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Liq. Viscosity (cp)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.viscocity}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Gas Viscocity (cp)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.viscocity}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Ap (ft<sup>2</sup>)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.ap}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      Surf. Tension (lb/s<sup>2</sup>)
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.surfTension}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
          {simulatorState.pressure.dipTube && (
            <View style={styles.table}>
              <View style={styles.tableRowMain}>
                <View style={styles.tableColMain}>
                  <Text style={styles.tableCell}>Fluid Properties </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Average Pressure (psi)</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.avgPressure}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>RS</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.rs}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Bo</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.bo}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Prd</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.prd}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Trd</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.trd}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Z</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.z}</Text>
                </View>
              </View>
              <Text style={styles.tableCellMaxDT}>
                Delta P: {results.deltaP} psi
              </Text>
            </View>
          )}
          {simulatorState.pressure.tubingScreenDP && (
            <View style={styles.grid}>
              <Image
                cache
                style={styles.imageScreen}
                src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/sand/screen.png`}
                fixed
              />

              <View style={styles.col1}>
                <Text style={styles.tableCellMax}>
                  {results.lossPressure} PSI
                </Text>
              </View>
            </View>
          )}
        </View>
        {simulatorState.pressure.dipTube && (
          <Image
            cache
            style={styles.image}
            src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/press/dip_tube.png`}
            fixed
          />
        )}
      </View>

      <Footer />
    </Page>
  );
};
