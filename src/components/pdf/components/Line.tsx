import React from "react";
import { Canvas } from "@react-pdf/renderer";

const Line = ({
  color = "#000",
  width = 1,
  style,
}: {
  color: string;
  width?: number;
  style?: any;
}) => (
  <Canvas
    style={{ width: "100%", height: 10, ...style }}
    paint={(painter, maxWidth, height) =>
      //     {
      //   const centerY = height / 2;

      //   painter
      //     .moveTo(0, centerY)
      //     .lineTo(maxWidth, centerY)
      //     .lineWidth(width)
      //     .strokeColor(color)
      //     .stroke();
      // }
      {
        return null;
      }
    }
  />
);

export default Line;
