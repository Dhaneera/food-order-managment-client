import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#3778C2";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#3778C2",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 32,
    fontStyle: "bold"
  },
  description: {
    width: "25%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  id: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  rate: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8
  },
  date: {
    width: "20%",
    textAlign: "right",
    borderRightWidth: 1,
    paddingRight: 8
  }
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.orders_id}>
      <Text style={styles.id}>{item.orders_id}</Text>
      <Text style={styles.description}>{item.name}</Text>
      <Text style={styles.rate}>{item.created_by}</Text>
      <Text style={styles.date}>{item.created_at.split("T")[0]}</Text>
      <Text style={styles.amount}>{item.price.toFixed(2)}</Text>
    </View>
  ));
  return <>{rows}</>;
};

export default InvoiceTableRow;

[
  {
      "name": "Dashan",
      "orders_id": "250301175",
      "price": 600,
      "created_at": "2025-03-01T03:54:28.621+00:00",
      "created_by": "0765462379"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "orders_id": "2503012811",
      "created_at": "2025-03-01T00:48:52.742+00:00",
      "price": 880
  },
  {
      "created_at": "2025-03-01T11:36:58.019+00:00",
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 600,
      "orders_id": "2503013567"
  },
  {
      "name": "Dashan",
      "price": 600,
      "orders_id": "2503013568",
      "created_at": "2025-03-01T00:56:51.583+00:00",
      "created_by": "0765462379"
  },
  {
      "created_at": "2025-03-01T00:59:06.714+00:00",
      "orders_id": "2503015738",
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 280
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "orders_id": "2503015868",
      "price": 600,
      "created_at": "2025-03-01T00:46:56.462+00:00"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "created_at": "2025-03-01T01:02:00.934+00:00",
      "price": 600,
      "orders_id": "2503016118"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 600,
      "created_at": "2025-03-01T00:55:05.147+00:00",
      "orders_id": "2503016546"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "created_at": "2025-03-01T03:46:02.932+00:00",
      "price": 1000,
      "orders_id": "2503016793"
  },
  {
      "created_at": "2025-03-01T00:44:29.029+00:00",
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 600,
      "orders_id": "2503017858"
  },
  {
      "orders_id": "2503018905",
      "name": "Dashan",
      "created_by": "0777007987",
      "created_at": "2025-03-01T00:54:52.684+00:00",
      "price": 280
  },
  {
      "name": "Dashan",
      "price": 600,
      "created_at": "2025-03-01T00:55:43.513+00:00",
      "created_by": "0765462379",
      "orders_id": "2503019002"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 600,
      "created_at": "2025-03-01T00:52:39.352+00:00",
      "orders_id": "2503019006"
  },
  {
      "name": "Dashan",
      "created_by": "0777007987",
      "price": 600,
      "created_at": "2025-03-01T01:01:14.625+00:00",
      "orders_id": "250301901"
  }
]