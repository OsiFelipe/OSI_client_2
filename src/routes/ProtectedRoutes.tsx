import { Navigate } from "react-router-dom";
import { SubLayout } from "../components";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const ProtectedRoute = ({ children }: Props) => {
  const { validateToken } = useContext(AuthContext);
  if (!validateToken()) {
    return <Navigate to="/" replace />;
  }

  return <SubLayout>{children}</SubLayout>;
};
