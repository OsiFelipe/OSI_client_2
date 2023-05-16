import React from "react";
import { View, StyleSheet, Text, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 15,
    left: 50,
    right: 50,
    textAlign: "left",
    fontSize: "10px",
    color: "gray",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 5,
  },
});

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>
      © Odessa Separator Inc, 2023 <span> </span>
      <Link src="https://www.odessaseparator.com/">OSI Inc</Link>
    </Text>
    <Text>1001 E Pearl Street, Odessa, TX - (+1) 432-580-7111</Text>
    <Text
      fixed
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
    />
  </View>
);

export default Footer;
