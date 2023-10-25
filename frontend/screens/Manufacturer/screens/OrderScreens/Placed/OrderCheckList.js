import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Button, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GreenButton from "../../../../../components/GreenButton";
import SlateButton from "../../../../../components/SlateButton";
import MaterialOrderService from "../../../../../services/MaterialOrder.Service";
import MaterialQAComplaintsService from "../../../../../services/MaterialQAComplaint.Service";
import MaterialQAService from "../../../../../services/MaterialQA.Service";

export default function OrderCheckList() {

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const route = useRoute();
    const { orderId } = route.params;
    const navigation = useNavigation();

    const [order, setOrder] = useState({});
    const [qualityAttributes, setQualityAttributes] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        MaterialOrderService.getMaterialOrder(orderId)
            .then((res) => {
                setOrder(res.data || {});
                setQualityAttributes(res.data.itemQA);
                checkStatusOfAllQualityAttributes();
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order:', error);
            });
        setTimeout(() => {
            setRefreshing(false);
        }, 10000);
    }, [orderId]);

    useEffect(() => {
        MaterialOrderService.getMaterialOrder(orderId)
            .then((res) => {
                setOrder(res.data || {});
                setQualityAttributes(res.data.materialQA);
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order :', error);
            });
    }, [orderId]);

    useEffect(() => {
        if (qualityAttributes.length > 0) {
            checkStatusOfAllQualityAttributes();
        }

    }, [qualityAttributes]);

    const checkStatusOfAllQualityAttributes = () => {
        let isAllCheckedStat = true;
        qualityAttributes.forEach((attribute) => {
            if (attribute.status === "Pending") {
                isAllCheckedStat = false;
            }
        });
        setIsAllChecked(isAllCheckedStat);
    };

    const toggleQualityAttributeStatus = (attributeId) => {
        const updatedAttributes = qualityAttributes.map((attribute) => {
            if (attribute._id === attributeId) {
                if (attribute.status === "Pending") {
                    attribute.status = "Checked";
                } else if (attribute.status === "Checked") {
                    attribute.status = "Pending";
                }
            }
            return attribute;
        });
        setQualityAttributes(updatedAttributes);
        checkStatusOfAllQualityAttributes();
    };

    const markAsChecked = (attribute) => {
        Alert.alert(
            "Quality is Okay?",
            "Are you sure you want to delete the complaint and mark as checked?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => { deleteComplaint(attribute) }
                },
            ],
            { cancelable: false }
        );
    };

    const deleteComplaint = (attribute) => {
        MaterialQAComplaintsService.getMaterialQAComplaintByQA(attribute._id)
            .then((res) => {
                MaterialQAComplaintsService.deleteMaterialQAComplaint(res.data[0]._id)
                    .then((res) => {
                        console.log(res.data + "deleted");
                        MaterialQAService.updateMaterialQA(attribute._id, {
                            status: "Checked",
                        }).then((res) => {
                            console.log(res.data);
                            // MaterialQAComplaintsService.getMaterialQAComplaintByMaterialOrder(orderId)
                            //     .then((res) => {
                            //         setOrder(res.data);
                            //         setQualityAttributes(res.data.materialQA);
                            //         setIsFontLoaded(true);
                            //     }).catch((error) => {
                            //         console.error('Error fetching order:', error);
                            //     });
                            navigation.navigate('PlacedOrderList');
                        }
                        ).catch((error) => {
                            console.error('Error updating complaint:', error);
                        });
                    }
                    ).catch((error) => {
                        console.error('Error deleting complaint:', error);
                    });
            }).catch((error) => {
                console.error('Error fetching order:', error);
            });
    }

    const saveStatusOfQA = () => {
        setRefreshing(true);
        MaterialOrderService.getMaterialOrder(orderId, { itemQA: qualityAttributes })
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.error('Error updating order:', error);
            });
        setTimeout(() => {
            MaterialOrderService.getMaterialOrder(orderId)
                .then((res) => {
                    setOrder(res.data);
                    setQualityAttributes(res.data.itemQA);
                    setIsFontLoaded(true);
                }).catch((error) => {
                    console.error('Error fetching order:', error);
                });
            setRefreshing(false);
        }, 2000);
    };

    const completeAssurance = () => {
        setRefreshing(true);
        MaterialOrderService.updateMaterialOrder(orderId, { status: "Assured", itemQA: qualityAttributes })
            .then((res) => {
                alert("Assurance Completed");
                console.log(res.data);
                navigation.navigate('PlacedOrderList');
            }).catch((error) => {
                console.error('Error updating order:', error);
            });
        // setTimeout(() => {
        //     MaterialOrderService.getMaterialOrder(orderId)
        //         .then((res) => {
        //             setOrder(res.data);
        //             setQualityAttributes(res.data.itemQA);
        //             setIsFontLoaded(true);
        //         }).catch((error) => {
        //             console.error('Error fetching order:', error);
        //         }); 
        //     setRefreshing(false);
        // }, 5000);


    };
    if (!isFontLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1D1D27" />
            </View>
        );
    }

    return (
        <>
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>ORDER ID :</Text>
                </View>
                <Text style={styles.idText}>{orderId} </Text>
                <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: "space-between", alignContent: 'center' }}>
                    {order.material.name.length > 0 && (
                        <>
                            <Text style={styles.title}>ORDER ITEM : {order.material.name}</Text>
                        </>
                    )}
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: "space-between", alignContent: 'center' }}>
                    <Text style={styles.idText}>{order.material.description}</Text>
                </View>
                {/* Headers */}
                <View style={styles.tableHeader}>
                    <Text style={styles.supplierHeader}>SUPPLIER</Text>
                    <Text style={styles.valueHeader}>VALUE</Text>
                    <Text style={styles.statusHeader}>STATUS</Text>
                </View>
                {/* Body */}
                <View style={styles.tableRow}>
                    <Text style={styles.supplierCell}>{order.supplier.companyName}</Text>
                    <Text style={styles.dollarCell}>
                        ${order.totalPrice}
                    </Text>
                    <Text style={styles.statusCell}>{order.status}</Text>
                </View>
                <View style={styles.qclContainer}>
                    <View style={styles.qclBody}>
                        <Text style={styles.qclTopic}>
                            <FontAwesome5 name="clipboard-list" size={24} color="black" />
                            &nbsp;&nbsp; QUALITY CHECKLIST
                        </Text>
                        <View style={styles.qclTable}>
                            {qualityAttributes.map((attribute) => (
                                <View style={styles.qclTableRow} key={attribute._id}>
                                    {attribute.status === "Pending" ? (
                                        <Ionicons
                                            name="ellipse-outline"
                                            size={24}
                                            color="#7777"
                                            onPress={() =>
                                                toggleQualityAttributeStatus(attribute._id)
                                            }
                                        />
                                    ) : attribute.status === "Checked" ? (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color="#3CDB7F"
                                            onPress={() =>
                                                toggleQualityAttributeStatus(attribute._id)
                                            }
                                        />
                                    ) : (
                                        <Entypo
                                            name="circle-with-cross"
                                            size={24}
                                            color="red"
                                        />
                                    )}
                                    <Text style={styles.qclCell}> &nbsp; &nbsp; &nbsp; {attribute.QAName} - {attribute.QADescription}</Text>
                                    <View style={styles.valueCell}>
                                        {attribute.status === "Pending" || attribute.status === "Checked" ? (
                                            <SlateButton title="Mark as Defect" onPress={() => navigation.navigate("PlacedMarkAsDefect", { orderId: orderId, attributeId: attribute._id })} />
                                        ) : (
                                            <SlateButton
                                                title="Mark as Checked"
                                                onPress={() => markAsChecked(attribute)}
                                            />
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                        {isAllChecked ? (<GreenButton style={styles.confirmBtn} title="Complete Assurance" onPress={completeAssurance} />)
                            : (<GreenButton style={styles.confirmBtn} title="Save Checklist" onPress={saveStatusOfQA} />)}

                    </View>
                </View>
            </ScrollView>
        </>
    )
}


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
        fontFamily: "Montserrat-Bold",
        fontSize: 24,
    },
    idText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
        marginBottom: 4,
    },
    nameText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
        paddingTop: 5,
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
    dollarCell: {
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    qclCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
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