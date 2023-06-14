import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { DrawerNav } from "./DrawerNav";

export const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return <>{isLoggedIn && <DrawerNav />}</>;
};
