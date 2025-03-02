import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTableRow from "./InvoiceTableRow";

const borderColor = "#00519C";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#3778C2"
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#00519C",
    backgroundColor: "#00519C",
    color: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1
  },
  description: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  id: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  date: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  rate: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  amount: {
    width: "15%"
  }
});

const InvoiceTables = ({ reportData }) => (
  <View style={styles.tableContainer}>
    <View style={styles.container}>
      <Text style={styles.id}>Order Id</Text>
      <Text style={styles.description}>Emp.Name</Text>
      <Text style={styles.rate}>Phone Number</Text>
      <Text style={styles.date}>Date</Text>
      <Text style={styles.amount}>Amount</Text>
    </View>
    <InvoiceTableRow items={reportData} />
  </View>
);

export default InvoiceTables;