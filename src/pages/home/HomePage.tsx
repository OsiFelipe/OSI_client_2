import { useContext } from "react";
import { Grid } from "@mui/material";
import { NavBar, ShowContent, CardHomePage } from "../../components";
import styles from "../main.module.sass";
import OsiImage from "../../utils/images/OSI.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading } = useContext(AuthContext);

  const cards = [
    {
      id: 0,
      title: "3d Wellbore",
      description: "Create a 3d wellbore based on survey data.",
      image: `${process.env.REACT_APP_SERVER}/assets/img/common/3d_wellbore.jpg`,
      action: () => {
        window.open("https://3dwellbore.com/", "_blank");
      },
    },
    {
      id: 1,
      title: "OSI",
      description: "Go to the mainpage",
      image: OsiImage,
      action: () => {
        window.open("https://www.odessaseparator.com/", "_blank");
      },
    },
    {
      id: 2,
      title: "Technical Designs",
      description: "Create a Technical Design",
      image: `${process.env.REACT_APP_SERVER}/assets/img/common/tech_design.jpg`,
      action: () => navigate("/tech/all"),
    },
    {
      id: 3,
      title: "Sand Simulator",
      description: "Simulate real conditions",
      image: `${process.env.REACT_APP_SERVER}/assets/img/common/sand_simulator.png`,
      action: () => navigate("/sim/sand"),
    },
    {
      id: 4,
      title: "Gas Simulator",
      description: "Simulate real conditions",
      image: `${process.env.REACT_APP_SERVER}/assets/img/common/gas_simulator.jpg`,
      action: () => navigate("/sim/gas"),
    },
    {
      id: 5,
      title: "Pressure Simulator",
      description: "Simulate real conditions",
      image: `${process.env.REACT_APP_SERVER}/assets/img/common/press_simulator.jpg`,
      action: () => navigate("/sim/press"),
    },
  ];

  let content: JSX.Element | JSX.Element[];
  content = (
    <>
      <NavBar title="Home" buttons={[]} />
      <div className={styles.pageContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          {cards.map((card) => (
            <Grid item lg={4} md={6} sm={12} xs={12} key={card.id}>
              <CardHomePage card={card} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );

  return <ShowContent error={""} isLoading={isLoading} content={content} />;
};
