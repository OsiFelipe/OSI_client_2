import React from "react";
import { StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  subtext: {
    color: "gray",
    margin: "5px 0",
  },
});

const Subtext = ({ children, style }: { children: string; style?: any }) => (
  <Text style={[styles.subtext, style]}>{children}</Text>
);

export default Subtext;
