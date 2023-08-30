import React from "react";
import { Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import {
  GasSimulatorProps,
  GasSimulatorResultProps,
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
    width: "220px",
    marginRight: "140px",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  gridcol: {
    display: "flex",
    flexDirection: "column",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    marginTop: 30,
    marginLeft: 15,
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableResults: {
    display: "flex",
    width: "100%",
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
    width: "40%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRight: "0.5px solid black",
    borderTopWidth: 0,
  },
  tableColTitleResults: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRight: "0.5px solid black",
    borderTopWidth: 0,
  },
  tableColMain: {
    width: "80%",
    borderStyle: "solid",
    color: "white",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColMainResults: {
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
    paddingTop: 1,
    paddingBottom: 1,
    fontFamily: "Times-Roman",
  },
});

interface Props {
  data: GasSimulatorProps;
  results: GasSimulatorResultProps;
  simulatorState: SimulatorProps;
}

export const GasSimulatorPage = ({ data, results, simulatorState }: Props) => {
  return (
    <Page style={styles.page}>
      <Header title={"Gas Simulator"} subtitle={""} />
      <Text style={styles.title}>Gas Separation Efficiency Calculator</Text>
      <View style={styles.grid}>
        <View>
          <View style={styles.table}>
            <View style={styles.tableRowMain}>
              <View style={styles.tableColMain}>
                <Text style={styles.tableCell}>INPUT</Text>
              </View>
            </View>
            {simulatorState.gas.gforce && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>
                      G-Force Packerless Size
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.packerlessSize}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Series</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Number of Gas Bodies</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.numberGasBodies}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>(NA)</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Gas Body Dimensions</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.gasBodyDimensions}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>(NA)</Text>
                  </View>
                </View>
              </>
            )}
            {simulatorState.gas.packerType && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Percentage of Run Time</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.percentageRuntime}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>%</Text>
                </View>
              </View>
            )}
            {simulatorState.gas.poorBoy && (
              <View style={styles.tableRow}>
                <View style={styles.tableColTitle}>
                  <Text style={styles.tableCell}>Percentage of Run Time</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.percentageRuntime}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>%</Text>
                </View>
              </View>
            )}
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Plunger Size</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.plungerSize}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Stroke Length</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.strokeLength}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Pump Speed</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.pumpSpeed}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>spm</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Pump Capacity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.pumpCapacity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BFPD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Pump Capacity / Stroke</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {data.pumpCapacityByStroke}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Gal/Stroke</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>BFPD</Text>
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
                <Text style={styles.tableCell}>Water Cut: </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.wCut}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Oil Rate</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.bopd}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BOPD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Water Rate</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.bwpd}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BWPD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Gas Rate</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.gasRate}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>MSCFD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Temperature</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.temperature}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>F</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>PIP</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.pip}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>psi</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Casing I.D.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.casingId}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Neck O.D.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.neckOD}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Gas Separator O.D.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.gasSeparatorOD}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Gas Separator I.D.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.gasSeparatorId}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>OD Dip Tube</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.ODdiptube}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>in</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Water SPGr</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.waterSP}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Gas SPGr</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.gasSP}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Oil API</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.oilApi}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Oil SPGr</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.oilSP}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            {!simulatorState.gas.gforce && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Interfacial Tension</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.interfacialTension}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>lb/s2</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Gravitational Force</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.gravitationalForce}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>ft/s2</Text>
                  </View>
                </View>
              </>
            )}
            {simulatorState.gas.packerType && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.tableCell}>Gas Separator Length</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {data.gasSeparatorLength}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>ft</Text>
                  </View>
                </View>
              </>
            )}
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>GLR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.glr}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>scf/stb</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Produced WOR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.wor}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BWPD/STBPD</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitle}>
                <Text style={styles.tableCell}>Produced GOR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.gor}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>scf/STB</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          {simulatorState.gas.packerType && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/gas/ptgs.jpg`}
              fixed
            />
          )}
          {simulatorState.gas.gforce && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/gas/g_force.png`}
              fixed
            />
          )}
          {simulatorState.gas.poorBoy && (
            <Image
              cache
              style={styles.image}
              src={`${process.env.REACT_APP_SERVER}/assets/img/simulator/gas/poorboy.png`}
              fixed
            />
          )}
        </View>
      </View>
      <View style={styles.tableResults}>
        <View style={styles.tableRowMain}>
          <View style={styles.tableColMainResults}>
            <Text style={styles.tableCell}>CALCULATED RESULTS </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>
              Free Gas Entering Pump wo/Separator, q'g
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{results.freeGasEnteringPump}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>scf/d</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>
              Gas Bubble Terminal Velocity, Vb
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {results.gasBubbleTerminalVelocity}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ft/s</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>
              Cross Sectional Area in Annulus, A
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{results.crossSectionalArea}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ft2</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>
              In-situ Superficial Liquid Velocity Inside Casing Anular, Vsl
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {results.inSituSuperficialLiquidVelocity}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ft/s</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>Natural Separation Efficiency</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {results.naturalSeparationEfficiency}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>%</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColTitleResults}>
            <Text style={styles.tableCell}>
              Free Gas Entering Pump w/ Separator q'g2
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {results.freeGasEnteringPumbWithSeparator}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>SCF/D</Text>
          </View>
        </View>
        {!simulatorState.gas.poorBoy && (
          <>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitleResults}>
                <Text style={styles.tableCell}>Quiet Zone Volume</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{results.quiteZoneVolume}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>gal</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitleResults}>
                <Text style={styles.tableCell}>Effective Strokes</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{results.effectiveStrokes}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>(NA)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColTitleResults}>
                <Text style={styles.tableCell}>Retention Time</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{results.retentionTime}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>min</Text>
              </View>
            </View>
          </>
        )}
      </View>
      <Footer />
    </Page>
  );
};
