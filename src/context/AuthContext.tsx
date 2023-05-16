import React from "react";

interface Props {
  isLoggedIn: boolean;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<Props>({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;
