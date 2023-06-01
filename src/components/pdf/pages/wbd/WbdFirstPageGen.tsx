import React from "react";
import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DataProps, WbdItemProps } from "../../../../interfaces/interfaces";
import wbdImage from "../../../../utils/images/onepage.png";
import espImage from "../../../../utils/images/ESP.jpg";
import rodPumpImage from "../../../../utils/images/SRP.jpg";
import PCPImage from "../../../../utils/images/PCP.png";
import gasLiftImage from "../../../../utils/images/GL.jpg";
import designImageESP from "../../../../utils/images/esp_design.png";
import designImageSRP from "../../../../utils/images/srp_design.png";
import designImageGL from "../../../../utils/images/gas_lift_design.png";
import designImagePCP from "../../../../utils/images/pcp_design.png";

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
    left: 152,
    width: "58px",
  },
  slaGL: {
    position: "relative",
    top: 48,
    left: 157,
    width: "30px",
  },
  slaPCP: {
    position: "relative",
    top: 45,
    left: 150,
    width: "45px",
  },
  designSRP: {
    position: "relative",
    top: 67,
    left: 166,
    width: "10px",
  },
  designESP: {
    position: "relative",
    top: 65,
    left: 162,
    width: "18px",
  },
  designGL: {
    position: "relative",
    top: 67,
    left: 165,
    width: "15px",
  },
  designPCP: {
    position: "relative",
    top: 60,
    left: 144,
    width: "55px",
  },
  sl: {
    position: "relative",
    top: 65,
    left: 146,
    width: "50px",
  },
  esp: {
    position: "relative",
    top: 65,
    left: 146,
    width: "50px",
  },
  toolPCP: {
    position: "relative",
    top: 60,
    left: 146,
    width: "50px",
  },
  toolPCPTol: {
    position: "relative",
    top: 60,
    left: 87.5,
    width: "50px",
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
    backgroundColor: "white",
  },
  descriptionSN: {
    position: "relative",
    top: 70,
    left: 200,
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
  lineSN: {
    position: "relative",
    top: 70,
    left: 190,
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
    backgroundColor: "white",
  },
  innerToolTol: {
    position: "relative",
    top: 65,
    left: 36.5,
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
  tolDepth: {
    position: "relative",
    top: 60,
    left: 70,
    fontSize: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const WbdFirstPageGen = ({
  tools,
  slaId,
  data: {
    basicInfo: { mdDepth, bhaInfo },
    lastBottom,
  },
}: {
  tools: WbdItemProps[];
  slaId: number;
  data: DataProps;
}) => {
  const sla =
    slaId === 0 || slaId === 1
      ? styles.sla
      : slaId === 2
      ? styles.slaGL
      : styles.slaPCP;
  const slaImage =
    slaId === 0
      ? rodPumpImage
      : slaId === 1
      ? espImage
      : slaId === 2
      ? gasLiftImage
      : PCPImage;
  const designImage =
    slaId === 0
      ? designImageSRP
      : slaId === 1
      ? designImageESP
      : slaId === 2
      ? designImageGL
      : designImagePCP;
  const design =
    slaId === 0
      ? styles.designSRP
      : slaId === 1
      ? styles.designESP
      : slaId === 2
      ? styles.designGL
      : styles.designPCP;
  return (
    <Page style={styles.body}>
      <Image cache style={styles.image} src={wbdImage} fixed />
      <Image cache style={sla} src={slaImage} fixed />
      <Image cache style={design} src={designImage} fixed />
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
                style={
                  slaId === 3
                    ? item.tol
                      ? styles.toolPCPTol
                      : styles.toolPCP
                    : item.tol
                    ? styles.toolTol
                    : styles.tool
                }
                src={`${process.env.REACT_APP_SERVER}${item.tool.imagePath}`}
                fixed
              />
              {item.tool.innerTools && item.tool.innerTools.imagePath ? (
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
                    {slaId === 0 && index === 0 && mdDepth && mdDepth !== 0
                      ? ` @ ${mdDepth} MD ft`
                      : ""}
                    {lastBottom &&
                      index === tools.length - 1 &&
                      `@ ${lastBottom.toFixed(2)} MD ft`}
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
                    {slaId === 0 && index === 0 && mdDepth && mdDepth !== 0
                      ? ` @ ${mdDepth} MD ft`
                      : ""}
                    {lastBottom &&
                      index === tools.length - 1 &&
                      `@ ${lastBottom.toFixed(2)} MD ft`}
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
