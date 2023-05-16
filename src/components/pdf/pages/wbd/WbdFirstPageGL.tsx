import React from "react";
import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { WbdItemProps } from "../../../../interfaces/interfaces";
import wbdImage from "../../../../utils/images/page1.png";
import slaImage from "../../../../utils/images/GL.jpg";
import designImage from "../../../../utils/images/gas_lift_design.png";

const styles = StyleSheet.create({
  body: {
    margin: 0,
  },
  image: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "100%",
    width: "100%",
  },
  sla: {
    position: "relative",
    top: 48,
    left: 157,
    width: "30px",
  },
  design: {
    position: "relative",
    top: 67,
    left: 165,
    width: "15px",
  },
  tool: {
    position: "relative",
    top: 65,
    left: 146,
    width: "50px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    position: "relative",
    top: 60,
    left: 150,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    position: "relative",
    top: 60,
    left: 160,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerTool: {
    position: "relative",
    top: 65,
    left: 95,
    width: "50px",
    alignItems: "center",
    justifyContent: "center",
  },
  lineInner: {
    position: "relative",
    top: 60,
    left: 100,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionInner: {
    position: "relative",
    top: 60,
    left: 110,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const WbdFirstPageGL = ({ tools }: { tools: WbdItemProps[] }) => {
  return (
    <Page style={styles.body}>
      <Image cache style={styles.image} src={wbdImage} fixed />
      <Image cache style={styles.sla} src={slaImage} fixed />
      <View style={styles.row}>
        <Image cache style={styles.design} src={designImage} fixed />
      </View>
      <View style={styles.column}>
        {tools.map((item, index) =>
          item && item.tool.imagePath ? (
            <View style={styles.row} key={index}>
              <Image
                key={index}
                cache
                style={styles.tool}
                src={`${process.env.REACT_APP_SERVER}${item.tool.imagePath}`}
                fixed
              />
              {item.tool.innerTools ? (
                <>
                  <Image
                    cache
                    style={styles.innerTool}
                    src={`${process.env.REACT_APP_SERVER}${item.tool.innerTools.imagePath}`}
                    fixed
                  />
                  <Text key={index} style={styles.lineInner} fixed>
                    _________
                  </Text>
                  <Text key={index} style={styles.descriptionInner} fixed>
                    {item.tool.description || item.tool.name}
                  </Text>
                </>
              ) : (
                <>
                  <Text key={index} style={styles.line} fixed>
                    _________
                  </Text>
                  <Text key={index} style={styles.description} fixed>
                    {item.tool.description || item.tool.name}
                  </Text>
                </>
              )}
            </View>
          ) : (
            ""
          )
        )}
      </View>
    </Page>
  );
};
