import React, { useState, useEffect } from "react";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View, Button, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function OrderCheckList({ route }) {
    const { order } = route.params;
    const navigation = useNavigation();

    const handleButtonClick = () => {
        console.log("Button clicked");
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>ORDER No: {order._id}</Text>

                </View>
                {/* Headers */}
                <View style={styles.tableHeader}>
                    <Text style={styles.manufacturerHeader}>MANUFACTURER</Text>
                    <Text style={styles.valueHeader}>VALUE</Text>
                    <Text style={styles.statusHeader}>STATUS</Text>
                    <Text style={styles.statusHeader}>PLACED DATE</Text>
                </View>
                {/* Body */}
                <View style={styles.tableRow}>
                    <Text style={styles.manufacturerCell}>{order.manufacturer.companyName}</Text>
                    <Text style={styles.valueCell}>${order.totalPrice}</Text>
                    <Text style={styles.statusCell}>{order.status}</Text>
                    <Text style={styles.statusCell}>{order.createdOn.slice(0, 10)}</Text>
                </View>

                <View style={styles.qclContainer}>
                    <Text style={styles.qclTopic}>
                        <FontAwesome5 name="clipboard-list" size={24} color="black" />
                        &nbsp;&nbsp; QUALITY CHECKLIST
                    </Text>
                    <ScrollView style={styles.qclBody}>
                        <View style={styles.qcltable}>

                            {order.materialQA.length > 0 && (order.materialQA.map((item) => {
                                return (
                                    <>
                                        <View style={styles.qcltableRow} key={item._id}>
                                            <Text style={styles.qclCell}> {item.status === "Checked" ? (
                                                <Ionicons name="checkmark-circle-sharp" size={24} color="green" />
                                            ) : item.status === "Defect" ? (
                                                <FontAwesome name="times-circle" size={24} color="red" />
                                            ) : (
                                                <AntDesign name="clockcircle" size={24} color="black" />
                                            )}</Text>
                                            <Text style={styles.supplierCell}>{item.QAName}</Text>
                                            <Text style={styles.supplierCell}>{item.QADescription}</Text>
                                        </View>
                                    </>
                                )
                            }))}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.defectContainer}>
                    <View style={styles.qclBody}>
                        <Text style={styles.qclTopic}>
                            <FontAwesome5 name="exclamation-triangle" size={24} color="black" />
                            &nbsp;&nbsp; DEFECTS
                        </Text>
                        <View style={styles.qclTable}>
                            {order.QAComplain.map((attribute) => (
                                <View style={styles.qclTableRow} key={attribute._id}>
                                    <Entypo
                                        name="circle-with-cross"
                                        size={24}
                                        color="red"
                                        marginRight={10}
                                    />
                                    {order.materialQA.length > 0 && (order.materialQA.map((qa) => (
                                        qa._id === attribute.QAid ? (<Text key={qa._id} style={styles.defectName}>{qa.QAName.toUpperCase()} : {qa.QADescription.toUpperCase()}</Text>) : null
                                    )))}
                                    <Image source={{ uri: attribute.image }} style={[{ width: 50, height: 50, marginBottom: 10, marginHorizontal: 12, margin: 5, borderWidth: 2, borderColor: 'black' }]} />
                                    <Text style={styles.defectName}>{attribute.complain}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        fontFamily: "Montserrat-Regular",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    qclBody: {
        paddingTop: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%",
        minHeight: 100,
        padding: 20
    },
    qclTable: {
        paddingTop: 10,
        borderColor: "black",
        borderRadius: 10,
        width: "100%",
    },
    title: {
        fontFamily: "Montserrat-Bold",
        fontSize: 17,
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderBottomWidth: 0.9,
        borderBottomColor: "#14D2B8",
    },
    manufacturerHeader: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#14D2B8",
        textAlign: "center",
    },
    supplierHeader: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#14D2B8",
        textAlign: "center",
    },
    valueHeader: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#14D2B8",
        textAlign: "center",
    },
    statusHeader: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#14D2B8",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
    },
    manufacturerCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    supplierCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    valueCell: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    statusCell: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    descriptionTitle: {
        fontFamily: "Montserrat-SemiBold",
        paddingBottom: 8,
        fontSize: 12,
        color: "#14D2B8",
    },
    descriptionText: {
        paddingHorizontal: 8,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 12,
    },
    qclContainer: {
        marginTop: 30,
        width: "100%",
        minHeight: 300,
    },
    qclTopic: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 24,
        paddingBottom: 8,
        textAlign: "center",
    },
    qclBody: {
        borderRadius: 10,
        width: "100%",
        minHeight: 300,
        maxHeight: 301,
        padding: 20,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
    },
    qcltableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    qcltable: {
        minHeight: 200,
    },
    qclCell: {
        flex: 1, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    confirmBtn: {
        width: "50%",
        marginLeft: 60,
        marginTop: 10,
    },
    defectContainer: {
        marginTop: 20,
        width: "100%",
        maxHeight: 150,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 10,
    },
    defectBody: {
        borderRadius: 10,
        width: "100%",
        minHeight: 150,
        maxHeight: 150,
        padding: 20,

    },
    QCcontainer: {
        flex: 1,
        flexDirection: 'column', // To create rows
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
    },
    QCrow: {
        flexDirection: 'row', // To create columns within rows
    },
    QCcolumn: {
        flex: 1, // Each column takes equal space within the row
        margin: 5, // Adjust margin as needed
    },
    qclTableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    qcltable: {
        minHeight: 100,
    },
    defectName: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        color: 'red',
    },
});