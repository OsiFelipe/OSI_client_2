import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { GForcePackerless } from "./GForcePackerless";
import { PackerTypeGas } from "./PackerTypeGas";
import { PoorType } from "./PoorType";
import { GasSimulatorForm } from "./GasSimulatorForm";
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

export const GasSimSelector = () => {
  const [value, setValue] = React.useState(0);
  const { onUpdateOptSimulator, simulatorState } = useContext(SimulatorContext);

  useEffect(() => {
    getIndexFromSimulatorState();
  }, []);

  const getIndexFromSimulatorState = () => {
    if (simulatorState.gas.gforce) setValue(0);
    if (simulatorState.gas.packerType) setValue(1);
    if (simulatorState.gas.poorBoy) setValue(2);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let valueToUpdate =
      newValue === 0 ? "gforce" : newValue === 1 ? "packerType" : "poorBoy";
    onUpdateOptSimulator("gas", valueToUpdate);
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="G Force Packerless" {...a11yProps(0)} />
          <Tab label="Packer Type" {...a11yProps(1)} />
          <Tab label="Poor Boy" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GasSimulatorForm packerless={true} />
        <GForcePackerless />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GasSimulatorForm packertype={true} />
        <PackerTypeGas />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GasSimulatorForm poorboy={true} />
        <PoorType />
      </TabPanel>
    </div>
  );
};
