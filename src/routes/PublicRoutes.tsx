import { Navigate } from "react-router-dom";
import { Layout } from "../components";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const PublicRoute = ({ children }: Props) => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Layout>{children}</Layout>;
  } else {
    return <Navigate to="/home" replace />;
  }
};
