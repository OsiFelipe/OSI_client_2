import React from "react";
import { Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  field: {
    marginBottom: 8,
    flex: 1,
  },
  label: {
    marginBottom: 1,
    color: "black",
  },
  value: {
    color: "blue",
    margin: 0,
  },
});

const Field = ({
  children,
  label,
  style,
}: {
  children: any;
  label: string;
  style?: any;
}) => (
  <View style={[styles.field, style]}>
    {label && <Text style={styles.label}>{label}</Text>}
    <Text style={styles.value}>{children || "Not provided"}</Text>
  </View>
);

export default Field;
