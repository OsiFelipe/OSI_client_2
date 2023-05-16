import React from "react";
import { TitleComponent } from "../ui/TitleComponent";
import { Button, Grid } from "@mui/material";
import styles from "../components.module.sass";
import { useState, useEffect, useContext } from "react";
import { ClientSelector, WellSelector } from "../basicInfo";
import DataContext from "../../context/DataContext";

export const SelectClientWellForm = ({
  onCancel,
  onSelectClient,
}: {
  onCancel: () => void;
  onSelectClient: (values: any) => void;
}) => {
  const [client, setClient] = useState({ id: 0, name: "" });
  const [well, setWell] = useState({
    id: 0,
    name: "",
    contact: "",
    phoneNumber: "",
  });
  const [isReady, setIsReady] = useState(false);
  const { fetchDataWells, wellOptions, clientOptions } =
    useContext(DataContext);

  useEffect(() => {
    if (client.id !== 0 && well.id !== 0) setIsReady(true);
  }, [well, client]);

  const handleSelectClient = () => {
    if (well.id !== 0 && client.id !== 0) {
      onSelectClient({
        client: client.name,
        wellName: well.name,
        wellId: well.id,
      });
    }
  };
  return (
    <>
      <TitleComponent title="Select Client" />
      <div className={styles.customToolForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ClientSelector
              options={clientOptions}
              value={client}
              handleChangeClient={(newValue: any) => {
                setClient(newValue);
                fetchDataWells(newValue?.id);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <WellSelector
              options={wellOptions}
              value={well}
              handleChangeWell={(newValue: any) =>
                newValue && setWell(newValue)
              }
            />
          </Grid>
        </Grid>
        <div className={styles.buttonGral}>
          <Button onClick={onCancel} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSelectClient}
            variant="contained"
            disabled={!isReady}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
