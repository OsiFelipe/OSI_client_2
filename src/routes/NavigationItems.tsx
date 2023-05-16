import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import CategoryIcon from "@mui/icons-material/Category";
import SellIcon from "@mui/icons-material/Sell";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CalculateIcon from "@mui/icons-material/Calculate";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GradientIcon from "@mui/icons-material/Gradient";
import CompressIcon from "@mui/icons-material/Compress";

export const NavigationItems = () => {
  const [openPropOption, setOpenPropOption] = useState(false);
  const [openTallyOption, setOpenTallyOption] = useState(false);
  const [openSimOption, setOpenSimOption] = useState(false);
  const navigate = useNavigate();

  const handleClickProp = () => {
    setOpenPropOption(!openPropOption);
  };
  const handleClickTally = () => {
    setOpenTallyOption(!openTallyOption);
  };
  const handleClickSimulator = () => {
    setOpenSimOption(!openSimOption);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, color: "background.paper" }}
      component="nav"
    >
      <ListItemButton onClick={() => navigate("/home")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/home")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItemButton>
      <ListItemButton onClick={handleClickProp}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <PrecisionManufacturingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Technical Design" />
        {openPropOption ? (
          <ExpandLess sx={{ color: "background.paper" }} />
        ) : (
          <ExpandMore sx={{ color: "background.paper" }} />
        )}
      </ListItemButton>
      <Collapse in={openPropOption} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/tech/0")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <DesignServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/tech/all")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="See All" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickTally}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <VerticalSplitIcon />
        </ListItemIcon>
        <ListItemText primary="Tally Design" />
        {openTallyOption ? (
          <ExpandLess sx={{ color: "background.paper" }} />
        ) : (
          <ExpandMore sx={{ color: "background.paper" }} />
        )}
      </ListItemButton>
      <Collapse in={openTallyOption} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/tally/0")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <DesignServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/tally/all")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="See All" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate("/well")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <OilBarrelIcon />
        </ListItemIcon>
        <ListItemText primary="Wells" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/client")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <PermContactCalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/sales/all")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <SellIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/products")}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
      <ListItemButton onClick={handleClickSimulator}>
        <ListItemIcon sx={{ color: "background.paper" }}>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="Simulators" />
        {openSimOption ? (
          <ExpandLess sx={{ color: "background.paper" }} />
        ) : (
          <ExpandMore sx={{ color: "background.paper" }} />
        )}
      </ListItemButton>
      <Collapse in={openSimOption} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/sim/sand")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <GradientIcon />
            </ListItemIcon>
            <ListItemText primary="Sand" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/sim/gas")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <WorkspacesIcon />
            </ListItemIcon>
            <ListItemText primary="Gas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/sim/press")}>
            <ListItemIcon sx={{ color: "background.paper" }}>
              <CompressIcon />
            </ListItemIcon>
            <ListItemText primary="Pressure" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
