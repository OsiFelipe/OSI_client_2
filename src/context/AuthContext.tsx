import React from "react";

interface Props {
  isLoggedIn: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  isDrawerOpen: boolean;
  desktop: boolean;
  idRole: null | number;
  onMoveDrawer: (action: boolean) => void;
  onLogin: (
    type: "user" | "client",
    username: string,
    password: string
  ) => void;
  onLogout: () => void;
  validateToken: () => boolean;
}

const AuthContext = React.createContext<Props>({
  isLoggedIn: false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  isDrawerOpen: false,
  desktop: false,
  idRole: null,
  onMoveDrawer: () => {},
  onLogin: () => {},
  onLogout: () => {},
  validateToken: () => false,
});

export default AuthContext;
