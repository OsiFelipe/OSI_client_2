import React from "react";
import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";

import OsiImage from "../../../utils/images/OSI.png";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "absolute",
    fontSize: 10,
    top: 15,
    left: 50,
    right: 40,
    textAlign: "left",
    color: "gray",
    height: 50,
  },
  image: {
    height: "110%",
    marginLeft: -10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
  },
});

export const Header = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <View style={styles.header} fixed>
    <Image src={OsiImage} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text>{subtitle}</Text>
      <Text>{new Date().toLocaleDateString("en-US")}</Text>
    </View>
  </View>
);
