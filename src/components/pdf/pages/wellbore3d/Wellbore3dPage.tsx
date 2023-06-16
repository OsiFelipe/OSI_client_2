import React from "react";
import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import { DataProps } from "../../../../interfaces/interfaces";
import Footer from "../../components/Footer";
import { Header } from "../../components/Header";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    fontSize: 14,
    paddingBottom: "200px",
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
    borderBottomColor: "rgb(251,171,53)",
  },
  image: {
    width: 500,
    marginTop: 12,
    textAlign: "center",
  },
  prodChart: {
    display: "flex",
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  titleProd: {
    fontSize: 15,
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
});

export const Wellbore3dpage = ({
  data: { basicInfo, wellbore3dImg },
}: {
  data: DataProps;
}) => {
  return (
    <Page style={styles.page}>
      <Header title={basicInfo.client.name} subtitle={basicInfo.well.name} />
      <Text style={styles.titleProd}>Wellbore 3D</Text>
      <View style={styles.prodChart}>
        {wellbore3dImg ? (
          <Image style={styles.image} src={wellbore3dImg} fixed />
        ) : null}
      </View>
      <Footer />
    </Page>
  );
};
