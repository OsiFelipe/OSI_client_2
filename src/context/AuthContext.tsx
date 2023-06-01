import React from "react";

interface Props {
  isLoggedIn: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  validateToken: () => boolean;
}

const AuthContext = React.createContext<Props>({
  isLoggedIn: false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  onLogin: () => {},
  onLogout: () => {},
  validateToken: () => false,
});

export default AuthContext;
