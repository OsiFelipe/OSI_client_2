import { Navigate } from "react-router-dom";
import { Layout } from "../components";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const PublicRoute = ({ children }: Props) => {
  const { validateToken } = useContext(AuthContext);
  if (validateToken()) {
    return <Navigate to="/home" replace />;
  } else {
    return <Layout>{children}</Layout>;
  }
};
