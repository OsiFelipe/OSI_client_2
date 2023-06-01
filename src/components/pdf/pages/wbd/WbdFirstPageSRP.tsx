import React from "react";
import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { WbdItemProps, DataProps } from "../../../../interfaces/interfaces";
import wbdImage from "../../../../utils/images/page1.png";
import slaImage from "../../../../utils/images/SRP.jpg";
import designImage from "../../../../utils/images/srp_design.png";

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
    top: 50,
    left: 150,
    width: "58px",
  },
  design: {
    position: "relative",
    top: 67,
    left: 166,
    width: "10px",
  },
  tool: {
    position: "relative",
    top: 65,
    left: 146,
    width: "50px",
  },
  toolTol: {
    position: "relative",
    top: 65,
    left: 87.5,
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
  lineTol: {
    position: "relative",
    top: 60,
    left: 90,
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
  lineSN: {
    position: "relative",
    top: 70,
    left: 190,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionSN: {
    position: "relative",
    top: 70,
    left: 200,
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
  innerToolTol: {
    position: "relative",
    top: 60,
    left: 37,
    width: "50px",
    alignItems: "center",
    justifyContent: "center",
  },
  lineInnerTol: {
    position: "relative",
    top: 60,
    left: 40,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionInnerTol: {
    position: "relative",
    top: 60,
    left: 50,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionTol: {
    position: "relative",
    top: 60,
    left: 100,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  tolDepth: {
    position: "relative",
    top: 60,
    left: 70,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const WbdFirstPageSRP = ({
  tools,
  data: {
    basicInfo: { mdDepth, bhaInfo },
  },
}: {
  tools: WbdItemProps[];
  data: DataProps;
}) => {
  return (
    <Page style={styles.body}>
      <Image cache style={styles.image} src={wbdImage} fixed />
      <Image cache style={styles.sla} src={slaImage} fixed />
      <View style={styles.column}>
        <View style={styles.row}>
          <Image cache style={styles.design} src={designImage} fixed />
        </View>
      </View>
      <View style={styles.column}>
        {tools.map((item, index) =>
          item && item.tool.imagePath ? (
            <View style={styles.row} key={index}>
              {item.tol && (
                <Text style={styles.tolDepth}>TOL @ {bhaInfo?.tol} MD ft</Text>
              )}
              <Image
                key={index}
                cache
                style={item.tol ? styles.toolTol : styles.tool}
                src={`${process.env.REACT_APP_SERVER}${item.tool.imagePath}`}
                fixed
              />
              {item.tool.innerTools ? (
                <>
                  <Image
                    cache
                    style={item.tol ? styles.innerToolTol : styles.innerTool}
                    src={`${process.env.REACT_APP_SERVER}${item.tool.innerTools.imagePath}`}
                    fixed
                  />
                  <Text
                    key={index}
                    style={item.tol ? styles.lineInnerTol : styles.lineInner}
                    fixed
                  >
                    _________
                  </Text>
                  <Text
                    key={index}
                    style={
                      item.tol
                        ? styles.descriptionInnerTol
                        : styles.descriptionInner
                    }
                    fixed
                  >
                    {item.tool.description || item.tool.name}
                    {index === 0 && mdDepth && mdDepth !== 0
                      ? ` @ ${mdDepth} MD ft`
                      : ""}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    key={index}
                    style={item.tol ? styles.lineTol : styles.line}
                    fixed
                  >
                    _________
                  </Text>
                  <Text
                    key={index}
                    style={
                      item.tol ? styles.descriptionTol : styles.description
                    }
                    fixed
                  >
                    {item.tool.description || item.tool.name}
                    {index === 0 && mdDepth && mdDepth !== 0
                      ? `@ ${mdDepth} MD ft`
                      : ""}
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
