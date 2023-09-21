import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.odessaseparator.com/">
        Odessa Separator Inc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export function LoginClientComponent({
  onClickLogin,
}: {
  onClickLogin: (
    type: "user" | "client",
    username: string,
    pass: string
  ) => void;
}) {
  const matches = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClickLogin("client", username, pass);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: matches ? "15px 0 15px 0" : "15px",
          borderRadius: matches ? "25px 0 0 25px" : "25px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to OSI System
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="clientKey"
            hiddenLabel
            label="Client Key"
            name="client"
            autoComplete="text"
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            style={{ color: "red" }}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            onChange={(event) => setPass(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                href="/"
                variant="body2"
                style={{ color: "black", fontWeight: "bold" }}
              >
                {"Login as User"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
