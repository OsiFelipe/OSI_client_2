import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { IconButton } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Spinner } from "../ui/Spinner";

export const PDFView = ({
  children,
  fileName,
}: {
  children: any;
  fileName?: string;
}) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "10vw",
          bottom: "50vh",
        }}
      >
        <PDFDownloadLink
          document={children}
          fileName={fileName || "OSI DESIGN "}
        >
          {({ loading }) =>
            loading ? (
              <Spinner />
            ) : (
              <IconButton sx={{ color: "rgb(251,171,53)" }} size="large">
                <DownloadForOfflineIcon fontSize="large" />
              </IconButton>
            )
          }
        </PDFDownloadLink>
      </div>
      <PDFViewer height={"800vh"}>{children}</PDFViewer>
    </>
  );
};
