import React from "react";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Button, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GreenButton from "../../../../components/GreenButton";
import SlateButton from "../../../../components/SlateButton";

const OrderAndChecklist = () => {
    const route = useRoute();
    const { orderId } = route.params;
    const navigation = useNavigation();

    const handleButtonClick = () => {
        // Add the desired functionality when the button is clicked.
        // For example, navigate to another screen.
        // navigation.navigate('AnotherScreen');
        console.log("Button clicked");
        navigation.navigate("MarkAsDefect", { orderId: orderId });
    };



    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>ORDER : {orderId}</Text>
                <GreenButton title="Order Journey" onPress={handleButtonClick} />
            </View>
            {/* Headers */}
            <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>MANUFACTURER</Text>
                <Text style={styles.supplierHeader}>SUPPLIER</Text>
                <Text style={styles.valueHeader}>VALUE</Text>
                <Text style={styles.statusHeader}>STATUS</Text>
            </View>
            {/* Body */}
            <View style={styles.tableRow}>
                <Text style={styles.manufacturerCell}>Manufacturer A</Text>
                <Text style={styles.supplierCell}>Supplier A</Text>
                <Text style={styles.valueCell}>$100</Text>
                <Text style={styles.statusCell}>Delivered</Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>DESCRIPTION</Text>
                <Text style={styles.descriptionText}>Manufacturer B</Text>
            </View>

            <View style={styles.qclContainer}>
                <Text style={styles.qclTopic}>
                    <FontAwesome5 name="clipboard-list" size={24} color="black" />
                    &nbsp;&nbsp; QUALITY CHECKLIST
                </Text>
                <View style={styles.qclBody}>
                    <View style={styles.table}>
                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Ionicons name="checkmark-circle-sharp" size={24} color="green" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Defect" onPress={handleButtonClick} /></Text>
                        </View>

                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Entypo name="circle-with-cross" size={24} color="red" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Normal" onPress={handleButtonClick} /></Text>
                        </View>

                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Ionicons name="checkmark-circle-sharp" size={24} color="green" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Defect" onPress={handleButtonClick} /></Text>
                        </View>

                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Entypo name="circle-with-cross" size={24} color="red" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Normal" onPress={handleButtonClick} /></Text>
                        </View>

                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Ionicons name="checkmark-circle-sharp" size={24} color="green" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Defect" onPress={handleButtonClick} /></Text>
                        </View>

                        <View style={styles.qcltableRow}>
                            <Text style={styles.qclCell}> <Entypo name="circle-with-cross" size={24} color="red" /></Text>
                            <Text style={styles.supplierCell}>Quality Attribute</Text>
                            <Text style={styles.valueCell}><SlateButton title="Mark as Normal" onPress={handleButtonClick} /></Text>
                        </View>
                    </View>

                    <GreenButton style={styles.confirmBtn} title="Confirm Button" onPress={handleButtonClick} />
                </View>
            </View>
        </ScrollView>
    );
};

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
    title: {
        fontFamily: "Montserrat-Bold",
        fontSize: 24,
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
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        width: "100%",
        minHeight: 100,
        padding: 20
    },
    qcltableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 2,
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
    }
});
export default OrderAndChecklist;
