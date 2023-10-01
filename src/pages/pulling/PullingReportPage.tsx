import { useContext } from "react";
import { ShowContent } from "../../components";
import AuthContext from "../../context/AuthContext";
import { PullingReportClient } from "./PullingReportClient";
import { PullingReportAdmin } from "./PullingReportAdmin";

export const PullingReportPage = () => {
  const { isClient, isLoading } = useContext(AuthContext);

  let content: JSX.Element | JSX.Element[];
  if (isClient) {
    content = <PullingReportClient />;
  } else {
    content = <PullingReportAdmin />;
  }

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
