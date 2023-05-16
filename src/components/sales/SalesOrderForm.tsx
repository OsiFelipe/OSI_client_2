import { Grid, TextField, SelectChangeEvent, Button } from "@mui/material";
import React, { useState } from "react";
import { TitleComponent } from "../ui/TitleComponent";
import { ChangeEvent, useContext } from "react";
import DataContext from "../../context/DataContext";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import styles from "../components.module.sass";
import { SelectClientWellForm } from "../common/SelectClientWellForm";
import { ModalComponent } from "../layout/ModalComponent";
import { useDate } from "../../hooks/useDate";

export const SalesOrderForm = ({ inEdit = false }: { inEdit?: boolean }) => {
  const [isModalClientOpen, setIsModalClientOpen] = useState(false);
  const {
    data: { salesInfo },
    onUpdateSalesInfo,
  } = useContext(DataContext);
  const { getDateFromDatabaseString, getDateTimeFromDatabaseString } =
    useDate();

  const onChangeValue = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>
  ) => {
    onUpdateSalesInfo(event.target.name, event.target.value);
  };
  return (
    <div>
      <TitleComponent title="Billing Information" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            type="date"
            helperText="Order Date"
            variant="outlined"
            sx={{ width: 380 }}
            name="orderDate"
            value={getDateFromDatabaseString(salesInfo.orderDate)}
            onChange={onChangeValue}
          />
          {!inEdit && (
            <div className={styles.buttonTally}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setIsModalClientOpen(true);
                }}
              >
                <PermContactCalendarIcon fontSize="small" sx={{ mr: 1 }} />
                Select Client
              </Button>
            </div>
          )}
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Quote Number"
            variant="outlined"
            sx={{ width: 380 }}
            name="quoteNumber"
            value={salesInfo.quoteNumber}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Company"
            variant="outlined"
            sx={{ width: 380 }}
            name="client"
            value={salesInfo.client}
            disabled
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="City"
            variant="outlined"
            sx={{ width: 380 }}
            name="city"
            value={salesInfo.city}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="State/Zip"
            variant="outlined"
            sx={{ width: 380 }}
            name="stateZip"
            value={salesInfo.stateZip}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Country"
            variant="outlined"
            sx={{ width: 380 }}
            name="country"
            value={salesInfo.country}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Phone"
            variant="outlined"
            sx={{ width: 380 }}
            name="phoneNumber"
            value={salesInfo.phoneNumber}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            sx={{ width: 380 }}
            name="email"
            value={salesInfo.email}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="email"
            label="Contact"
            variant="outlined"
            sx={{ width: 380 }}
            name="contact"
            value={salesInfo.contact}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            type="email"
            label="PO"
            variant="outlined"
            sx={{ width: 380 }}
            name="po"
            value={salesInfo.po}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      <TitleComponent title="Order Information" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="datetime-local"
              helperText="Need By"
              variant="outlined"
              sx={{ width: 400, mb: 2 }}
              name="needBy"
              value={getDateTimeFromDatabaseString(salesInfo.needBy)}
              onChange={onChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Well Name"
              variant="outlined"
              sx={{ width: 400, mb: 2 }}
              name="wellName"
              disabled
              value={salesInfo.wellName}
              onChange={onChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Directions"
            name="directions"
            variant="outlined"
            sx={{ width: 450 }}
            multiline
            rows={4}
            value={salesInfo.directions}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Delivery Contact"
              name="deliveryContact"
              variant="outlined"
              sx={{ width: 400, mb: 2 }}
              value={salesInfo.deliveryContact}
              onChange={onChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Salesman Contact"
              name="salesmanContact"
              variant="outlined"
              sx={{ width: 400, mb: 2 }}
              value={salesInfo.salesmanContact}
              onChange={onChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Special Notes"
            name="specialNotes"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: 450 }}
            value={salesInfo.specialNotes}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      {isModalClientOpen && (
        <ModalComponent
          modalContent={
            <SelectClientWellForm
              onCancel={() => setIsModalClientOpen(false)}
              onSelectClient={(values) => {
                onUpdateSalesInfo("clientInfo", values);
                setIsModalClientOpen(false);
              }}
            />
          }
        />
      )}
    </div>
  );
};
