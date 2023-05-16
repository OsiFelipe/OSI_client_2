import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: "bold",
    margin: "5px 0",
    flex: 1,
  },
});

const SectionHeader = ({
  children,
  secondary = false,
  style = {},
}: {
  children: any;
  secondary?: boolean;
  style?: any;
}) => <Text style={[styles.sectionHeader]}>{children}</Text>;

export default SectionHeader;
