import React, { useContext } from "react";
import { useState } from "react";
import { ClientProps, WellProps } from "../../interfaces/interfaces";
import { ClientSelector, WellSelector } from ".";
import DataContext from "../../context/DataContext";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ModalComponent } from "../layout/ModalComponent";
import { AddClientForm } from "../common/AddClientForm";
import { AddWellForm } from "../common/AddWellForm";
import { DataWbd } from "../basicInfo/DataWbd";
import styles from "../components.module.sass";

export function BasicInfoComponent({ bhaInfo = true }: { bhaInfo?: boolean }) {
  const [isModalOpenCreateClient, setIsModalOpenCreateClient] =
    useState<Boolean>(false);
  const [isModalOpenCreateWell, setIsModalOpenCreateWell] =
    useState<Boolean>(false);
  const {
    data: { basicInfo },
    clientOptions,
    wellOptions,
    fetchDataWells,
    onUpdateBasicInfo,
    onCreateClient,
    onCreateWell,
    onUpdateBha,
  } = useContext(DataContext);

  const options = [
    {
      id: 0,
      name: "Rod Pump",
      reqField: "Seating Nipple",
      image: "/assets/img/sla/rp.png",
    },
    {
      id: 1,
      name: "ESP",
      reqField: "Sensor Depth",
      image: "/assets/img/sla/esp.png",
    },
    {
      id: 2,
      name: "Gas Lift",
      reqField: "End of tubing",
      image: "/assets/img/sla/gl.png",
    },
    {
      id: 3,
      name: "PCP",
      reqField: "Pump Depth",
      image: "/assets/img/sla/pcp.png",
    },
  ];
  const defaultProps = {
    options: options,
    getOptionLabel: (option: { id: number; name: string }) => option.name,
  };
  return (
    <div className={styles.mainForm}>
      <div className={styles.wbdInfo}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mt={2} variant="h6">
              Basic Information
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Custom Design Name"
              variant="outlined"
              sx={{ width: "30vw" }}
              value={basicInfo.customName}
              onChange={(event) =>
                onUpdateBasicInfo("customName", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={8}>
            <div className={styles.fieldButton}>
              <ClientSelector
                options={clientOptions}
                value={basicInfo.client}
                handleChangeClient={(newValue: ClientProps | null) => {
                  onUpdateBasicInfo("client", newValue);
                  newValue && fetchDataWells(newValue?.id);
                }}
              />
              <Tooltip title="Add Client">
                <IconButton onClick={() => setIsModalOpenCreateClient(true)}>
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              value={basicInfo.sla}
              isOptionEqualToValue={(option, value) => {
                return true;
              }}
              onChange={(_, newValue) =>
                newValue && onUpdateBasicInfo("sla", newValue)
              }
              {...defaultProps}
              disablePortal
              sx={{ width: "15vw" }}
              renderInput={(params) => (
                <TextField {...params} label="Artificial Lift System" />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <div className={styles.fieldButton}>
              <WellSelector
                options={wellOptions || []}
                value={basicInfo.well}
                handleChangeWell={(newValue: WellProps | null) =>
                  onUpdateBasicInfo("well", newValue)
                }
              />
              {!!!basicInfo.client.id ? (
                <IconButton disabled>
                  <AddBoxIcon />
                </IconButton>
              ) : (
                <Tooltip title="Add Well">
                  <IconButton onClick={() => setIsModalOpenCreateWell(true)}>
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              type="number"
              label={basicInfo.sla.reqField || "Select ALS"}
              value={basicInfo.mdDepth}
              disabled={!!!basicInfo.sla.reqField}
              variant="outlined"
              sx={{ width: "15vw" }}
              onChange={(event) => {
                const inputValue = parseFloat(event.target.value);
                if (!isNaN(inputValue))
                  onUpdateBasicInfo("mdDepth", inputValue);
              }}
            />
          </Grid>
        </Grid>
        <DataWbd
          basicInfo={basicInfo}
          bhaInfo={bhaInfo}
          handleUpdateWbd={(item: string, value: any) => {
            onUpdateBha(item, value);
          }}
        />
        {isModalOpenCreateClient && (
          <ModalComponent
            modalContent={
              <AddClientForm
                onCancel={() => setIsModalOpenCreateClient(false)}
                onAddClient={(name) => {
                  onCreateClient(name);
                  setIsModalOpenCreateClient(false);
                }}
              />
            }
          />
        )}
        {isModalOpenCreateWell && (
          <ModalComponent
            modalContent={
              <AddWellForm
                onCancel={() => setIsModalOpenCreateWell(false)}
                client={basicInfo.client}
                onAddWell={(values: WellProps) => {
                  onCreateWell(values);
                  setIsModalOpenCreateWell(false);
                }}
              />
            }
          />
        )}
      </div>
      <div className={styles.columnSla}>
        {basicInfo.sla.image && (
          <img
            className={styles.slaImage}
            src={`${process.env.REACT_APP_SERVER}${basicInfo.sla.image}`}
            alt="SLA"
          />
        )}
      </div>
    </div>
  );
}
