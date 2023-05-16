import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    width: "100%",
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "rgb(251,171,53)",
    paddingBottom: 4,
  },
});

const Title = ({ children }: { children: string }) => (
  <Text style={styles.title}>{children}</Text>
);

export default Title;
