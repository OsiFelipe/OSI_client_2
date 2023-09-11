import React, { useContext, useState } from "react";
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
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { ListItem } from "@mui/material";
import AuthContext from "../context/AuthContext";

interface Props {
  onCloseMenu: () => void;
}

export const NavigationList = ({ onCloseMenu }: Props) => {
  const open = true;
  const [openPropOption, setOpenPropOption] = useState(false);
  const [openTallyOption, setOpenTallyOption] = useState(false);
  const [openSimOption, setOpenSimOption] = useState(false);
  const { idRole } = useContext(AuthContext);
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

  const navItems = [
    {
      id: 0,
      onClick: () => navigate("/home"),
      icon: <HomeIcon />,
      name: "Home",
      roles: [0, 1, 2, 3],
    },
    {
      id: 1,
      onClick: () => navigate("/home"),
      icon: <SupervisorAccountIcon />,
      name: "Admin",
      roles: [0],
    },
    {
      id: 2,
      onClick: handleClickProp,
      icon: <PrecisionManufacturingOutlinedIcon />,
      name: "Technical Design",
      roles: [0, 1, 2],
      openCloseOption: openPropOption,
      children: [
        {
          id: 0,
          onClick: () => navigate("/tech/0"),
          icon: <DesignServicesIcon />,
          name: "Create",
          children: [],
        },
        {
          id: 1,
          onClick: () => navigate("/tech/all"),
          icon: <FormatListNumberedIcon />,
          name: "See All",
          children: [],
        },
      ],
    },
    {
      id: 3,
      onClick: handleClickTally,
      icon: <VerticalSplitIcon />,
      name: "Tally Design",
      roles: [0, 1, 2],
      openCloseOption: openTallyOption,
      children: [
        {
          id: 0,
          onClick: () => navigate("/tally/0"),
          icon: <DesignServicesIcon />,
          name: "Create",
        },
        {
          id: 1,
          onClick: () => navigate("/tally/all"),
          icon: <FormatListNumberedIcon />,
          name: "See All",
        },
      ],
    },
    {
      id: 4,
      onClick: () => navigate("/well"),
      icon: <OilBarrelIcon />,
      name: "Wells",
      roles: [0, 1, 2],
    },
    {
      id: 5,
      onClick: () => navigate("/client"),
      icon: <PermContactCalendarIcon />,
      name: "Clients",
      roles: [0, 1, 2],
    },
    {
      id: 6,
      onClick: () => navigate("/sales/all"),
      icon: <SellIcon />,
      name: "Sales",
      roles: [0, 1, 2],
    },
    {
      id: 7,
      onClick: () => navigate("/products"),
      icon: <CategoryIcon />,
      name: "Products",
      roles: [0, 1, 2],
    },
    {
      id: 8,
      onClick: handleClickSimulator,
      icon: <CalculateIcon />,
      name: "Simulators",
      roles: [0, 1],
      openCloseOption: openSimOption,
      children: [
        {
          id: 0,
          onClick: () => navigate("/sim/sand"),
          icon: <GradientIcon />,
          name: "Sand",
        },
        {
          id: 1,
          onClick: () => navigate("/sim/gas"),
          icon: <WorkspacesIcon />,
          name: "Gas",
        },
        {
          id: 2,
          onClick: () => navigate("/sim/press"),
          icon: <CompressIcon />,
          name: "Pressure",
        },
      ],
    },
    {
      id: 9,
      onClick: () => navigate("/pulling-report"),
      icon: <SmartToyIcon />,
      name: "Pulling Reports",
      roles: [0],
    },
    // {
    //   id: 9,
    //   onClick: () => navigate("/stepper"),
    //   icon: <SmartToyIcon />,
    //   name: "Designer",
    //   roles: [0],
    // },
    // {
    //   id: 10,
    //   onClick: () => navigate("/stepper"),
    //   icon: <SmartToyIcon />,
    //   name: "Designer",
    //   roles: [0],
    // },
  ];
  return (
    <List>
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {(idRole === 0 || idRole) && item.roles.includes(idRole) ? (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                item.onClick();
                !item.children && onCloseMenu();
              }}
              key={index}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {item.children && (
                  <>
                    {item.openCloseOption ? (
                      <ExpandLess sx={{ color: "background.paper" }} />
                    ) : (
                      <ExpandMore sx={{ color: "background.paper" }} />
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          ) : null}
          {item.children && (
            <Collapse in={item.openCloseOption} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.id}>
                    <ListItemButton
                      onClick={() => {
                        child.onClick();
                        onCloseMenu();
                      }}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};
