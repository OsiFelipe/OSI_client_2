import React, { useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { IconButton, Tooltip } from "@mui/material";
import { Spinner } from "../ui/Spinner";
import { Download } from "@mui/icons-material";

export const PDFView = ({
  children,
  fileName,
  action,
}: {
  children: any;
  fileName?: string;
  action?: () => void;
}) => {
  useEffect(() => {
    if (action) action();
  }, []);

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
              <Tooltip title="Download">
                <IconButton
                  sx={{
                    backgroundColor: "rgb(251,171,53)",
                    "&:hover": { backgroundColor: "#FFF" },
                  }}
                  size="large"
                >
                  <Download fontSize="large" />
                </IconButton>
              </Tooltip>
            )
          }
        </PDFDownloadLink>
      </div>
      <PDFViewer height={"800vh"}>{children}</PDFViewer>
    </>
  );
};
