import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Card, CardActions, CardContent } from "@mui/material";
import styles from "../components.module.sass";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  onSave: () => void;
  onRemove: () => void;
  active: boolean;
}

export const FullScreenModal = ({
  title,
  children,
  onSave,
  onRemove,
  active,
}: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={
          active
            ? {
                maxWidth: 345,
                backgroundColor: "rgba(251,171,53,0.9)",
                borderRadius: "15px",
                color: "white",
                border: "0.5px solid black",
                boxShadow: "7px 4px 4px rgba(90,100,119,0.3)",
                "&:hover": {
                  backgroundColor: "rgb(251,171,53)",
                  boxShadow: "15px 7px 7px rgba(90,100,119,0.3)",
                  color: "white",
                  cursor: "pointer",
                },
              }
            : {
                maxWidth: 345,
                backgroundColor: "rgba(90,100,119,0.3)",
                borderRadius: "15px",
                color: "black",
                border: "0.5px solid black",
                boxShadow: "7px 4px 4px rgba(90,100,119,0.3)",
                "&:hover": {
                  boxShadow: "15px 7px 7px rgba(90,100,119,0.3)",
                  cursor: "pointer",
                },
              }
        }
        className={styles.cardSimulator}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: "15px",
          }}
        >
          {active && (
            <Button
              size="small"
              variant="outlined"
              sx={
                active
                  ? { color: "white", border: "1px solid #FBAB35" }
                  : { color: "black", border: "1px solid #5a6477" }
              }
              onClick={onRemove}
            >
              Remove
            </Button>
          )}
          <Button
            size="small"
            variant="outlined"
            sx={
              active
                ? { color: "white", border: "1px solid #FBAB35" }
                : { color: "black", border: "1px solid #5a6477" }
            }
            onClick={handleClickOpen}
          >
            {active ? "Continue" : "Start"}
          </Button>
        </CardActions>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ zIndex: "10000" }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                onSave();
                handleClose();
              }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </div>
  );
};
