import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import {
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

interface Props {
  id: number;
  name: string;
  contact: string;
  phoneNumber: string;
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
  const buttons = [
    {
      title: "Edit",
      action: () => {},
      icon: <EditIcon />,
    },
  ];

  let content: JSX.Element | JSX.Element[];

  if (!data) {
    content = <Spinner />;
  } else {
    const {
      data: { name, contact, phoneNumber, proposals, tallies },
    } = data;
    content = (
      <>
        <NavBar title={name} buttons={buttons} />
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
                value={name}
                sx={{ width: "100%" }}
                onChange={(event) =>
                  console.log("customName", event.target.value)
                }
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                value={contact}
                sx={{ width: "100%" }}
                onChange={(event) =>
                  console.log("customName", event.target.value)
                }
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                sx={{ width: "100%" }}
                onChange={(event) =>
                  console.log("customName", event.target.value)
                }
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
                value="Active"
                onChange={(_, newValue) =>
                  (newValue === "Active" || newValue === "Inactive") &&
                  console.log(newValue)
                }
                {...{
                  options: ["Active", "Inactive"],
                }}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Grid>
          </Grid>
          <TableWellDetail tallies={tallies} proposals={proposals} />
        </div>
      </>
    );
  }

  return <ShowContent error={error} isLoading={isLoading} content={content} />;
};
