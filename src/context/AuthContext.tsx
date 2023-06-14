import React from "react";

interface Props {
  isLoggedIn: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  isDrawerOpen: boolean;
  desktop: boolean;
  onMoveDrawer: (action: boolean) => void;
  onLogin: (username: string, password: string) => void;
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
  onMoveDrawer: () => {},
  onLogin: () => {},
  onLogout: () => {},
  validateToken: () => false,
});

export default AuthContext;
