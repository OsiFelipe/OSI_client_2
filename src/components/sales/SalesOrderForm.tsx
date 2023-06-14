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
    <div className={styles.salesForm}>
      <TitleComponent title="Billing Information" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            type="date"
            helperText="Order Date"
            variant="outlined"
            className={styles.salesFormField}
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
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Quote Number"
            variant="outlined"
            className={styles.salesFormField}
            name="quoteNumber"
            value={salesInfo.quoteNumber}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Company"
            variant="outlined"
            className={styles.salesFormField}
            name="client"
            value={salesInfo.client}
            disabled
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="City"
            variant="outlined"
            className={styles.salesFormField}
            name="city"
            value={salesInfo.city}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="State/Zip"
            variant="outlined"
            className={styles.salesFormField}
            name="stateZip"
            value={salesInfo.stateZip}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Country"
            variant="outlined"
            className={styles.salesFormField}
            name="country"
            value={salesInfo.country}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Phone"
            variant="outlined"
            className={styles.salesFormField}
            name="phoneNumber"
            value={salesInfo.phoneNumber}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            className={styles.salesFormField}
            name="email"
            value={salesInfo.email}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="email"
            label="Contact"
            variant="outlined"
            className={styles.salesFormField}
            name="contact"
            value={salesInfo.contact}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="email"
            label="PO"
            variant="outlined"
            className={styles.salesFormField}
            name="po"
            value={salesInfo.po}
            onChange={onChangeValue}
          />
        </Grid>
      </Grid>
      <TitleComponent title="Order Information" />
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="datetime-local"
              helperText="Need By"
              variant="outlined"
              sx={{ mb: 2 }}
              className={styles.OrderFormField}
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
              className={styles.OrderFormField}
              name="wellName"
              disabled
              value={salesInfo.wellName}
              onChange={onChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Directions"
            name="directions"
            variant="outlined"
            className={styles.salesFormBox}
            multiline
            rows={4}
            value={salesInfo.directions}
            onChange={onChangeValue}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="text"
              label="Delivery Contact"
              name="deliveryContact"
              variant="outlined"
              sx={{ mb: 2 }}
              className={styles.OrderFormField}
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
              className={styles.OrderFormField}
              value={salesInfo.salesmanContact}
              onChange={onChangeValue}
            />
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Special Notes"
            name="specialNotes"
            variant="outlined"
            multiline
            rows={4}
            className={styles.salesFormBox}
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
