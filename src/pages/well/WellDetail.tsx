import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import {
  AlertComponent,
  NavBar,
  ShowContent,
  Spinner,
  TableWellDetail,
} from "../../components";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ProposalProps } from "../../interfaces/interfaces";
import styles from "../main.module.sass";
import DataContext from "../../context/DataContext";

interface Props {
  id: number;
  name: string;
  contact: string;
  phoneNumber: string;
  active: boolean;
  proposals: ProposalProps[];
  tallies: ProposalProps[];
}

interface FetchResponse {
  success?: boolean;
  data: Props;
}

export const WellDetail = () => {
  const { idWell } = useParams();
  const { data, error, isLoading } = useFetch<FetchResponse>(
    `well-detail/${idWell}`
  );
  const [wellName, setWellName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [wellStatus, setWellStatus] = useState("Active");
  const { isSuccess, isError, onEditWell } = useContext(DataContext);

  useEffect(() => {
    if (data) {
      const {
        data: { name, contact, phoneNumber, active },
      } = data;
      setWellName(name);
      setContactName(contact);
      setPhoneNumber(phoneNumber);
      active ? setWellStatus("Active") : setWellStatus("Inactive");
    }
  }, [data]);

  const buttons = [
    {
      title: "Edit",
      action: () => {
        idWell &&
          onEditWell({
            id: idWell,
            name: wellName,
            contact: contactName,
            phoneNumber,
            active: wellStatus === "Active" ? true : false,
          });
      },
      icon: <EditIcon />,
    },
  ];

  let content: JSX.Element | JSX.Element[];

  if (!data) {
    content = <Spinner />;
  } else {
    const {
      data: { proposals, tallies },
    } = data;
    content = (
      <>
        <NavBar title={wellName} buttons={buttons} />
        <div className={styles.infoForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography mt={2} variant="h6">
                Well Information
              </Typography>
              <Divider />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Well Name"
                variant="outlined"
                value={wellName}
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                onChange={(event) => setWellName(event.target.value)}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                value={contactName}
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                onChange={(event) => setContactName(event.target.value)}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Autocomplete
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                value={wellStatus}
                onChange={(_, newValue) =>
                  (newValue === "Active" || newValue === "Inactive") &&
                  setWellStatus(newValue)
                }
                {...{
                  options: ["Active", "Inactive"],
                }}
                sx={{ width: "100%", backgroundColor: "#FFF" }}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Grid>
          </Grid>
          <TableWellDetail tallies={tallies} proposals={proposals} />
        </div>
        {isSuccess && <AlertComponent type="success" />}
        {isError && <AlertComponent type="error" />}
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
