import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localLoggedIn = localStorage.getItem("isLoggedIn");
    if (localLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = async () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    await navigate("/");
  };

  const loginHandler = (username: string) => {
    try {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/home");
    } catch (e) {
      throw new Error("Not Authorized, please contact the Administrator");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
