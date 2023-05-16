import React from "react";
import { Page, Text, Image, StyleSheet } from "@react-pdf/renderer";
import OsiImage from "../../../utils/images/OSI.png";
import { DataProps } from "../../../interfaces/interfaces";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "50px",
    fontSize: 14,
    paddingBottom: "200px",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  mainHeader: {
    fontSize: 22,
    fontWeight: "heavy",
    display: "flex",
    alignItems: "center",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

export const PresentationPage = ({
  data: { basicInfo },
}: {
  data: DataProps;
}) => {
  const today = new Date().toLocaleDateString("en-US");
  return (
    <Page style={styles.page}>
      <Image style={styles.image} src={OsiImage} />
      <Text style={styles.text} fixed>
        Technical Proposal For:
      </Text>
      <Text style={styles.mainHeader} fixed>
        {basicInfo.client.name}
      </Text>
      <Text style={styles.mainHeader} fixed>
        {basicInfo.well.name}
      </Text>
      <Text style={styles.header} fixed>
        {today}
      </Text>
      <Footer />
    </Page>
  );
};
