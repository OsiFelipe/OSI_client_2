import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { PumpGuard } from "./PumpGuard";
import { SandSimulatorForm } from "./SandSimulatorForm";
import { TubingScreen } from "./TubingScreen";
import { SuperPerf } from "./SuperPerf";
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

export const SandSimSelector = () => {
  const [value, setValue] = React.useState(0);
  const { onUpdateOptSimulator, simulatorState } = useContext(SimulatorContext);

  useEffect(() => {
    getIndexFromSimulatorState();
  }, []);

  const getIndexFromSimulatorState = () => {
    if (simulatorState.sand.tubingScreen) setValue(0);
    if (simulatorState.sand.pumpGuard) setValue(1);
    if (simulatorState.sand.superPerf) setValue(2);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let valueToUpdate =
      newValue === 0
        ? "tubingScreen"
        : newValue === 1
        ? "pumpGuard"
        : "superPerf";
    onUpdateOptSimulator("sand", valueToUpdate);
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Tubing Screen" {...a11yProps(0)} />
          <Tab label="Pump Guard" {...a11yProps(1)} />
          <Tab label="Super Perf" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SandSimulatorForm tubingScreen={true} />
        <TubingScreen />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SandSimulatorForm pumpGuard={true} />
        <PumpGuard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SandSimulatorForm superPerf={true} />
        <SuperPerf />
      </TabPanel>
    </div>
  );
};
