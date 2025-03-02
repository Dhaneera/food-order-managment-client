import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import InvoiceTables from './InvoiceTable'

const styles = StyleSheet.create({
    text: {
        marginTop: 24,
        textAlign: "center",
        fontStyle: "bold",
    },
    center: {
        marginTop: 96,
        textAlign: "center",
    }
})
const Report = (props) => {
    console.log(props.data)
    return props.data == [] ? (
        <View>
            <View>
                <Text style={styles.center}>Could not found any records for the selected dates</Text>
            </View>
        </View>
    ) : (
        <View>
            <View>
                <Text style={styles.text}>Employee Meal Deduction Report </Text>
            </View>
            <InvoiceTables reportData={props.data} />
        </View>
    )
}

export default Report
