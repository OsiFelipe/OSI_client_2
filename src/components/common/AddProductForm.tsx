import React from "react";
import {
  ProductSelectorByName,
  ProductSelectorByPN,
  QuantityField,
} from "../tally";
import { ProductProps } from "../../interfaces/interfaces";
import { TitleComponent } from "../ui/TitleComponent";
import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { initial_tool_state } from "../../utils/data";
import styles from "../components.module.sass";

export const AddProductForm = ({
  products,
  onCancel,
  onAddProduct,
}: {
  products: ProductProps[];
  onCancel: () => void;
  onAddProduct: (values: ProductProps) => void;
}) => {
  const [value, setValue] = useState(initial_tool_state);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (value.id !== 0 && value.quantity) setIsReady(true);
  }, [value]);

  const handleAddProduct = () => {
    if (value.id !== 0) onAddProduct(value);
  };
  return (
    <>
      <TitleComponent title="Add Product" />
      <div className={styles.customToolForm}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <ProductSelectorByName
              options={products}
              onSelectName={(newValue: any) => {
                setValue(newValue);
              }}
              value={value}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ProductSelectorByPN
              options={products}
              onSelectPN={(newValue: any) => {
                setValue(newValue);
              }}
              value={value}
            />
          </Grid>
          <Grid item lg={2} xs={12}>
            <QuantityField
              value={value.quantity || 0}
              onChangeQTY={(newValue) => {
                setValue((prev) => {
                  return { ...prev, quantity: newValue };
                });
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <div className={styles.productImage}>
              {value.imagePath ? (
                <img
                  alt="product-img"
                  src={`${process.env.REACT_APP_SERVER}/${value.imagePath}`}
                />
              ) : (
                <div>No Image Preview</div>
              )}
            </div>
          </Grid>
        </Grid>
        <div className={styles.buttonGral}>
          <Button onClick={onCancel} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleAddProduct}
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
