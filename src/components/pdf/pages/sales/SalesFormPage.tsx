import React from "react";
import { Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { SalesItemProp } from "../../../../interfaces/interfaces";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Table from "../../components/Table";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    padding: "50px",
    fontSize: 12,
    paddingBottom: "100px",
  },
  title: {
    fontSize: 15,
    marginBottom: 0,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
  titleProd: {
    fontSize: 15,
    marginTop: 100,
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: 600,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  image: {
    width: 700,
    marginTop: 12,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
  },
  productTable: {
    marginTop: 20,
    fontSize: 12,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableColDetail: {
    width: "75%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableColMain: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "rgba(251,171,53,0.8)",
  },
  tableColMainGrayPartNumber: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "rgba(90,100,119, 0.8)",
  },
  tableColMainGrayItems: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "rgba(90,100,119, 0.8)",
  },
  tableColMainGrayQty: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "rgba(90,100,119, 0.8)",
  },
  tableColPartNumber: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableColName: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    textAlign: "left",
  },
  tableColQty: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    paddingBottom: 2,
    paddingTop: 2,
    alignContent: "flex-start",
    fontFamily: "Times-Roman",
  },
});

export const SalesFormPage = ({
  data: {
    city,
    client,
    contact,
    country,
    deliveryContact,
    directions,
    email,
    needBy,
    orderDate,
    phoneNumber,
    quoteNumber,
    po,
    salesmanContact,
    specialNotes,
    stateZip,
    wellName,
    productList,
  },
}: {
  data: SalesItemProp;
}) => {
  return (
    <Page style={styles.page}>
      <Header
        title={client}
        subtitle={
          "Order Date " + new Date(orderDate).toLocaleDateString().split("T")[0]
        }
      />
      <Text style={styles.title}>Sales Order</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View>
            <Text style={styles.tableCell}>BILLING INFORMATION</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>QUOTE NUMBER:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{quoteNumber}</Text>
          </View>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>PHONE:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>COMPANY:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{client}</Text>
          </View>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>EMAIL:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{email}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>CITY: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{city}</Text>
          </View>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>CONTACT: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{contact}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>STATE/ZIP: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{stateZip}</Text>
          </View>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>PO: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{po}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>COUNTRY: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{country}</Text>
          </View>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>AFE: </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{}</Text>
          </View>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View>
            <Text style={styles.tableCell}>ORDER INFORMATION</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>WELL NAME:</Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>{wellName}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>NEED BY:</Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>
              {new Date(needBy).toLocaleDateString() +
                " - " +
                needBy.split("T")[1].split(".")[0]}
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>DELIVERY CONTACT: </Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>{deliveryContact}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>SALESMAN CONTACT </Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>{salesmanContact}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>DIRECTIONS: </Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>{directions}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMain}>
            <Text style={styles.tableCell}>SPECIAL NOTES: </Text>
          </View>
          <View style={styles.tableColDetail}>
            <Text style={styles.tableCell}>{specialNotes}</Text>
          </View>
        </View>
      </View>

      <View style={styles.productTable}>
        <View style={styles.tableRow}>
          <View>
            <Text style={styles.tableCell}>DETAIL</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColMainGrayPartNumber}>
            <Text style={styles.tableCell}>ITEM</Text>
          </View>
          <View style={styles.tableColMainGrayItems}>
            <Text style={styles.tableCell}>DESCRIPTION</Text>
          </View>
          <View style={styles.tableColMainGrayQty}>
            <Text style={styles.tableCell}>QTY</Text>
          </View>
        </View>
        <>
          {productList.map((item) => (
            <>
              {item.id !== 0 && item.osi && (
                <View style={styles.tableRow} key={item.id}>
                  <View style={styles.tableColPartNumber}>
                    <Text style={styles.tableCell}>{item.partNumber}</Text>
                  </View>
                  <View style={styles.tableColName}>
                    <Text style={styles.tableCell}>
                      {item.name || item.description}
                    </Text>
                  </View>
                  <View style={styles.tableColQty}>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                  </View>
                </View>
              )}
            </>
          ))}
        </>
      </View>

      <Footer />
    </Page>
  );
};
