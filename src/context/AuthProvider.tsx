import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Base64 } from "js-base64";
import { isExpired, decodeToken } from "react-jwt";
import { useRequest } from "../hooks";
import { useMediaQuery } from "@mui/material";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: Props) => {
  const { handleRequest } = useRequest();
  const navigate = useNavigate();
  const desktop = useMediaQuery("(min-width:900px)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    validateSession();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }, [isSuccess]);

  useEffect(() => {
    desktop && setIsDrawerOpen(true);
  }, []);

  const logoutHandler = async () => {
    setIsLoading(true);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    setIsLoading(false);
  };

  const loginHandler = (username: string, pass: string) => {
    setIsLoading(true);
    try {
      const loop1Pass = Base64.encode(pass);
      const loop2Pass = Base64.encode(loop1Pass);
      const data = {
        user: username,
        password: loop2Pass,
      };
      let options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
      };
      handleRequest({ endpoint: "login", options })
        .then((response) => {
          if (response.data.token) {
            // const loop1 = Base64.encode(response.data.token);
            // const loop2 = Base64.encode(loop1);
            // const loop3 = Base64.encode(loop2);
            // const loop4 = Base64.encode(loop3);
            // const loop5 = Base64.encode(loop4);
            // const loop6 = Base64.encode(loop5);
            // const loop7 = Base64.encode(loop6);
            localStorage.setItem("info", response.data.token);
            navigate(0);
            setIsSuccess(true);
          } else {
            setIsLoading(false);
            setIsError(true);
          }
        })
        .catch(() => setIsError(true));
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      throw new Error("Not Authorized, please contact the Administrator");
    }
  };

  const validateSession = () => {
    if (validateToken()) {
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      logoutHandler();
    }
  };

  const validateToken = (): boolean => {
    const token = localStorage.getItem("info");
    if (token) {
      const expired = isExpired(token);
      if (expired) return false;
    } else {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSuccess,
        isError,
        isLoading,
        isDrawerOpen,
        desktop,
        onMoveDrawer: (action: boolean) => setIsDrawerOpen(action),
        onLogin: loginHandler,
        onLogout: logoutHandler,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
