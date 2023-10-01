import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

interface ButtonProps {
  title: string;
  action: () => void;
  icon: JSX.Element;
  disabled?: Boolean;
}

interface Props {
  buttons: ButtonProps[];
  title: string;
}

const iconStyles = {
  backgroundColor: "rgb(251,171,53, 0.9)",
  padding: "4px",
  color: "white",
  marginRight: "5px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgb(90,100,119)",
  },
};

export function DesktopBar({ title, buttons }: Props) {
  const { onLogout } = useContext(AuthContext);
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "rgba(90,100,119,0.8)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                color: "white",
              },
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {buttons.map((button, index) => (
              <Button
                startIcon={button.icon}
                key={index}
                onClick={button.action}
                disabled={!!button.disabled}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  paddingRight: "3rem",
                }}
              >
                {button.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={onLogout} sx={iconStyles} size="medium">
                <LogoutIcon fontSize="medium" sx={{ padding: "2px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
