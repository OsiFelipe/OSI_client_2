import { Navigate } from "react-router-dom";
import { SubLayout } from "../components";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const ProtectedRoute = ({ children }: Props) => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/" replace />;
  }

  return <SubLayout>{children}</SubLayout>;
};
