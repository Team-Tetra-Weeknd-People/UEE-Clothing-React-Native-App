import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Button, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, Alert, Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GreenButton from "../../../../components/GreenButton";
import SlateButton from "../../../../components/SlateButton";
import ItemOrderService from "../../../../services/ItemOrder.Service";
import ItemQAComplaintsService from "../../../../services/ItemQAComplaints.Service";
import ItemQAService from "../../../../services/ItemQA.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Stars from "../../../../components/Stars";
import BigSlateButton from "../../../../components/BigSlateButton";

const OrderAndChecklist = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ItemOrderService.getItemOrderById(orderId)
            .then((res) => {
                setOrder(res.data);
                setQualityAttributes(res.data.itemQA);
                checkStatusOfAllQualityAttributes();
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
    const [isStarsModalVisible, setStarsModalVisible] = useState(false);

    // Function to open the Stars modal
    const openStarsModal = () => {
        setStarsModalVisible(true);
    };

    // Function to close the Stars modal
    const closeStarsModal = () => {
        setStarsModalVisible(false);
    };
    useEffect(() => {
        ItemOrderService.getItemOrderById(orderId)
            .then((res) => {
                setOrder(res.data);
                setQualityAttributes(res.data.itemQA);
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order:', error);
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
    const toOrderJourney = async () => {
        await AsyncStorage.removeItem("orderId");
        await AsyncStorage.setItem("orderId", orderId).then(() => {
            navigation.navigate("JOURNEY");
        });
    };

    const markAsChecked = (attributeID) => {
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
                    onPress: () => { deleteComplaint(attributeID) }
                },
            ],
            { cancelable: false }
        );
    };

    const deleteComplaint = (attributeID) => {
        ItemQAComplaintsService.getItemComplaintByQA(attributeID)
            .then((res) => {
                ItemQAComplaintsService.deleteItemComplaint(res.data[0]._id)
                    .then((res) => {
                        console.log("deleted");
                        ItemQAService.updateItemQA(attributeID, {
                            status: "Checked",
                        }).then((res) => {
                            console.log(res.data);
                            ItemOrderService.getItemOrderById(orderId)
                                .then((res) => {
                                    setOrder(res.data);
                                    setQualityAttributes(res.data.itemQA);
                                    setIsFontLoaded(true);
                                }).catch((error) => {
                                    console.error('Error fetching order:', error);
                                });
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
        ItemOrderService.updateItemOrderById(orderId, { itemQA: qualityAttributes })
            .then((res) => {
                console.log(res.data);
                alert("Checklist Saved Successfully");
            }).catch((error) => {
                console.error('Error updating order:', error);
            });
        setTimeout(() => {
            ItemOrderService.getItemOrderById(orderId)
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
        ItemOrderService.updateItemOrderById(orderId, { status: "Assured", itemQA: qualityAttributes })
            .then((res) => {
                console.log(res.data);
                openStarsModal();
            }).catch((error) => {
                console.error('Error updating order:', error);
            });
        setTimeout(() => {
            ItemOrderService.getItemOrderById(orderId)
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
                <Text style={styles.title}>ORDER ID :</Text>
                <GreenButton title="Order Journey" onPress={toOrderJourney} />
            </View>
            <Text style={styles.idText}>{orderId} </Text>
            <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: "space-between", alignContent: 'center' }}>
                <Text style={styles.title}>ORDER ITEM :</Text>
                <Text style={styles.nameText}>{order.item.name} </Text></View>
            {/* Headers */}
            <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>MANUFACTURER</Text>
                <Text style={styles.supplierHeader}>SUPPLIER</Text>
                <Text style={styles.valueHeader}>VALUE</Text>
                <Text style={styles.statusHeader}>STATUS</Text>
            </View>
            {/* Body */}
            <View style={styles.tableRow}>
                <Text style={styles.manufacturerCell}>{order.manufacturer.companyName}</Text>
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
                                        marginRight={10}
                                    />
                                ) : attribute.status === "Checked" ? (
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={24}
                                        color="#3CDB7F"
                                        onPress={() =>
                                            toggleQualityAttributeStatus(attribute._id)
                                        }
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
                                <Text style={styles.qclCell}>{attribute.qaName.toUpperCase()} : {attribute.qaDescription.toUpperCase()}</Text>
                                <View style={styles.valueCell}>
                                    {attribute.status === "Pending" || attribute.status === "Checked" ? (
                                        <SlateButton title="Mark as Defect" onPress={() => navigation.navigate("MarkAsDefect", { orderId: orderId, attributeId: attribute._id })} />
                                    ) : (
                                        <SlateButton
                                            title="Mark as Checked"
                                            onPress={() => markAsChecked(attribute._id)}
                                        />
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                    {isAllChecked ? (<GreenButton style={styles.confirmBtn} title="Complete Assurance" onPress={completeAssurance} />)
                        : (<GreenButton style={styles.confirmBtn} title="Save Checklist" onPress={saveStatusOfQA} />)}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isStarsModalVisible}
                        onRequestClose={closeStarsModal}
                    >
                        <View style={styles.starsModal}>
                            <Stars />
                            <BigSlateButton title="Confirm Rating" onPress={closeStarsModal} style={{alignSelf: 'center', marginTop: 10}} />
                        </View>
                    </Modal>
                </View>
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
                                {order.itemQA.map((qa) => (
                                    qa._id === attribute.QAid ? (<Text key={qa._id} style={styles.defectName}>{qa.qaName.toUpperCase()} : {qa.qaDescription.toUpperCase()}</Text>) : null
                                ))}
                                <Image source={{ uri: attribute.image }} style={[{ width: 50, height: 50, marginBottom: 10, marginHorizontal: 12, margin: 5, borderWidth: 2, borderColor: 'black' }]} />
                                <View style={styles.valueCell}>
                                    <SlateButton title="View More" onPress={() => navigation.navigate("MarkAsDefect", { orderId: orderId, attributeId: attribute.QAid })} />
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
    starsModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:  "#14D2B8",
        margin: 20,
        marginVertical: 300,
        borderRadius: 20,
        elevation: 5,
        boxShadow: '1 1 5px rgba(F, F, F, 0.5)',
        padding: 15,
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
    },
    defectContainer: {
        width: "100%",
        marginBottom: 20,
    },
    qclTopic: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        paddingBottom: 8,
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
        justifyContent: "space-between",
        alignItems: "center",
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
export default OrderAndChecklist;
