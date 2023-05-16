import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  image: string;
  title: string;
  description: string;
  action: () => void;
}
export const CardHomePage = ({
  card: { image, title, description, action },
}: {
  card: Props;
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "rgba(90,100,119,0.3)",
        width: "30vw",
        borderRadius: "15px",
        color: "black",
        border: "0.5px solid black",
        boxShadow: "10px 5px 5px rgba(90,100,119,0.3)",
        "&:hover": {
          backgroundColor: "rgb(251,171,53)",
          boxShadow: "15px 7px 7px rgba(90,100,119,0.3)",
          color: "white",
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
        sx={{
          backgroundColor: "white",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "15px",
        }}
      >
        <Button size="small" variant="outlined" onClick={action}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
};
