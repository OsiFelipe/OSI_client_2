import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { PressureDropDiptube } from "./PressureDropDiptube";
import { PressureDropTs } from "./PressureDropTs";
import { PressureSimForm } from "./PressureSimForm";
import { useContext, useEffect } from "react";
import SimulatorContext from "../../../../context/SimulatorContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const PressureSimSelector = () => {
  const [value, setValue] = React.useState(0);
  const { onUpdateOptSimulator, simulatorState } = useContext(SimulatorContext);
  useEffect(() => {
    getIndexFromSimulatorState();
  }, []);

  const getIndexFromSimulatorState = () => {
    if (simulatorState.pressure.dipTube) setValue(0);
    if (simulatorState.pressure.tubingScreenDP) setValue(1);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let valueToUpdate = newValue === 0 ? "dipTube" : "tubingScreenDP";
    onUpdateOptSimulator("pressure", valueToUpdate);
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Dip Tube" {...a11yProps(0)} />
          <Tab label="Screen" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PressureSimForm dipTube={true} />
        <PressureDropDiptube />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PressureSimForm tubingScreen={true} />
        <PressureDropTs />
      </TabPanel>
    </div>
  );
};
