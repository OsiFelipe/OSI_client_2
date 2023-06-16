import React from "react";
import { Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import { DataProps } from "../../../interfaces/interfaces";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    padding: "50px",
    fontSize: 14,
    paddingBottom: "100px",
  },
  title: {
    fontSize: 15,
    marginBottom: 0,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
  titleProd: {
    fontSize: 15,
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  image: {
    width: 600,
    marginTop: 2,
    textAlign: "center",
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
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
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
    width: "40%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRight: "1px solid black",
    borderTopWidth: 0,
  },
  tableColMain: {
    width: "80%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: "Times-Roman",
  },
  prodChart: {
    display: "flex",
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: "1%",
  },
});

export const BasicInfoPage = ({
  data: {
    basicInfo: { client, well, sla, mdDepth, prodImage, bhaInfo },
  },
}: {
  data: DataProps;
}) => {
  return (
    <Page style={styles.page}>
      <Header title={client.name} subtitle={well.name} />
      <Text style={styles.title}>Technical Proposal</Text>
      <View style={styles.table}>
        <View style={styles.tableRowMain}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>WELL CONDITIONS </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>WELL NAME:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{well.name}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ALS:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{sla.name}</Text>
          </View>
        </View>
        {bhaInfo?.casingOd && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CASING OD/WEIGHT:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.casingOd} lb/ft</Text>
            </View>
          </View>
        )}
        {bhaInfo?.casingId && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CASING ID:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.casingId} in</Text>
            </View>
          </View>
        )}
        {bhaInfo?.tubing && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TUBING:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.tubing} in</Text>
            </View>
          </View>
        )}
        {bhaInfo?.tol && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TOP OF LINER:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.tol} MD ft</Text>
            </View>
          </View>
        )}
        {bhaInfo?.bfpd && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>FLUID PRODUCTION:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.bfpd} BFPD</Text>
            </View>
          </View>
        )}
        {bhaInfo?.waterCut && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>WATER CUT:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.waterCut} %</Text>
            </View>
          </View>
        )}
        {bhaInfo?.bopd && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>OIL FLOW:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.bopd} BOPD</Text>
            </View>
          </View>
        )}
        {bhaInfo?.bwpd && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>WATER FLOW:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.bwpd} BWPD</Text>
            </View>
          </View>
        )}
        {bhaInfo?.gasFlow && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>GAS FLOW:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.gasFlow} MCFD</Text>
            </View>
          </View>
        )}
        {bhaInfo?.gor && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>GOR:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.gor} SCF/STB</Text>
            </View>
          </View>
        )}
        {bhaInfo?.glr && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>GLR:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bhaInfo?.glr} SCF/STB</Text>
            </View>
          </View>
        )}
        {sla.reqField && (
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{sla.reqField || "DEPTH"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{mdDepth} FT MD</Text>
            </View>
          </View>
        )}
      </View>

      {prodImage !== "" && (
        <View style={styles.prodChart}>
          <Text style={styles.titleProd}>Production History</Text>
          <Image style={styles.image} src={prodImage} fixed />
        </View>
      )}
      <Footer />
    </Page>
  );
};
