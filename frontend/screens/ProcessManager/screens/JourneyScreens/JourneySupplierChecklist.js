import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Button, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GreenButton from "../../../../components/GreenButton";
import SlateButton from "../../../../components/SlateButton";
import ItemOrderService from "../../../../services/ItemOrder.Service";

const JourneySupplierChecklist = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ItemOrderService.getItemOrderById(orderId)
            .then((res) => {
                setOrder(res.data);
                setQualityAttributes(res.data.materialQA);
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order:', error);
            });
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [orderId]);

    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const route = useRoute();
    const { orderId } = route.params;
    const navigation = useNavigation();

    const [order, setOrder] = useState({});
    const [qualityAttributes, setQualityAttributes] = useState([]);

    useEffect(() => {
        ItemOrderService.getItemOrderById(orderId)
            .then((res) => {
                setOrder(res.data);
                setQualityAttributes(res.data.materialQA);
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order:', error);
            });
    }, [orderId]);

    if (!isFontLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1D1D27" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>CHECKLIST REVIEW</Text>
            </View>
            <Text style={styles.idText}>ORDER ID : {orderId} </Text>
            <View>
                <Text style={styles.idText}>ORDER ITEM : {order.item.name}</Text>
                </View>
            {/* Headers */}
            <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>SUPPLIER</Text>
                <Text style={styles.supplierHeader}>EMAIL ADDRESS</Text>
                <Text style={styles.statusHeader}>LEVEL</Text>
            </View>
            {/* Body */}
            <View style={styles.tableRow}>
                <Text style={styles.manufacturerCell}>{order.supplier.companyName}</Text>
                <Text style={styles.supplierCell}>{order.supplier.email}</Text>
                <Text style={styles.statusCell}>{order.supplier.level}</Text>
            </View>
            <View style={styles.qclContainer}>
                <View style={styles.qclBody}>
                    <Text style={styles.qclTopic}>
                        <FontAwesome5 name="clipboard-list" size={24} color="black" />
                        &nbsp;&nbsp; QUALITY CHECKLIST
                    </Text>
                    <Text style={styles.topicText}>MANUFACTURER'S REVIEW ON SUPPLIER'S CHECKLIST</Text>
                    <View style={styles.qclTable}>
                        {qualityAttributes.map((attribute) => (
                            <View style={styles.qclTableRow} key={attribute._id}>
                                {attribute.status === "Pending" ? (
                                    <Ionicons
                                        name="ellipse-outline"
                                        size={24}
                                        color="#7777"
                                        marginRight={10}
                                    />
                                ) : attribute.status === "Checked" ? (
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={24}
                                        color="#3CDB7F"
                                        marginRight={10}
                                    />
                                ) : (
                                    <Entypo
                                        name="circle-with-cross"
                                        size={24}
                                        color="red"
                                        marginRight={10}
                                    />
                                )}
                                <Text style={[{color: attribute.status === "Pending"? "#7777" : 
                            attribute.status === "Checked" ? "#3CDB7F" : "red"},styles.qclCell]}>{attribute.QAName.toUpperCase()} : {attribute.QADescription.toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>

                </View>
            </View>
            <View style={styles.defectContainer}>
                <View style={styles.qclBody}>
                    <Text style={styles.qclTopic}>PROOF OF DEFECTS
                    </Text>
                    <View style={styles.qclTable}>
                        {order.materialQAComplaint.map((attribute) => (
                            <View style={styles.qclTableRowDefect} key={attribute._id}>
                                <Entypo
                                    name="circle-with-cross"
                                    size={24}
                                    color="red"
                                    marginRight={10}
                                />
                                {order.materialQA.map((qa) => (
                                    qa._id === attribute.QAid ? (<Text key={qa._id} style={styles.defectName}>{qa.QAName.toUpperCase()} : {qa.QADescription.toUpperCase()}</Text>) : null
                                ))}
                                <Image source={{ uri: attribute.image }} style={[{ width: 50, height: 50, marginBottom: 10, marginHorizontal: 12, margin:5 ,borderWidth : 2, borderColor: 'black'}]} />
                                <View style={styles.valueCell}>
                                    <SlateButton title="View More" onPress={() => navigation.navigate("JourneySupplierDefects", { orderId: orderId, attributeId: attribute.QAid })} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // Change the background color as needed
    },
    container: {
        flex: 1,
        padding: 16,
        fontFamily: "Montserrat-Regular",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        letterSpacing: 1.5,
    },
    idText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        letterSpacing: 1,
    },
    topicText: {
        fontFamily: "Montserrat-Regular",
        fontSize: 12,
        padding: 5,
        textAlign: "center",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        marginTop: 20,
        borderBottomWidth: 0.9,
        borderBottomColor: "#14D2B8",
        marginHorizontal: 10,
    },
    manufacturerHeader: {
        flex: 2, // Adjusted flex value
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
    statusHeader: {
        flex: 1, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#14D2B8",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 5,
    },
    manufacturerCell: {
        flex: 2, // Adjusted flex value
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
    statusCell: {
        flex: 1, // Adjusted flex value
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
        width: "100%",
    },
    defectContainer: {
        width: "100%",
        marginBottom: 20,
    },
    qclTopic: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        textAlign: "center",
        color: '#1D1D27',
        letterSpacing: 1,
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
    qclTableRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 5,
        paddingHorizontal: 60,
        borderBottomColor: "#1D1D2722",
        borderBottomWidth: 1,
    },
    qclTableRowDefect: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: "#1D1D2722",
        borderBottomWidth: 1,
    },
    qclCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
    },
    defectName: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
        color: 'red',
    },
    valueCell: {
        flex: 2, // Adjusted flex value
    },
    confirmBtn: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 5,
    }
});
export default JourneySupplierChecklist;