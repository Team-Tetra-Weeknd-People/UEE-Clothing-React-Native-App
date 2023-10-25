import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialOrderList from './MaterialOrderList';
import ItemOrderList from './ItemOrderList';


const OrderList = () => {
    
    const [selectedType, setSelectedType] = useState("MATERIAL");

    const orderTypes = ["MATERIAL", "ITEM"];
    
    const selectType = (type) => {
        setSelectedType(type);
      }
    
    return (
        <>
        <View
        className="w-full bg-white flex flex-row justify-evenly items-center"
        >
            {orderTypes.map((type) => (
            <TouchableOpacity
                key={type}
                onPress={() => selectType(type)}
                style={{
                height: 40,
                borderBottomWidth: selectedType === type ? 5 : 1,
                borderBottomColor:
                    selectedType === type ? "#1D1D27" : "transparent",
                padding: 5,
                }}
            >
                <Text
                style={{ fontSize: 4, fontWeight: "bold", color: "#1D1D27" }}
                ></Text>
                <Text
                style={{
                    fontSize: 12,
                    fontFamily: "Montserrat-SemiBold",
                    color: selectedType === type ? "#1D1D27" : "grey",
                }}
                >
                {type}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        {selectedType === "MATERIAL" ? (
            <MaterialOrderList/>
        ) : (
            <ItemOrderList/>
        )}
        </>
    )
};

export default OrderList;
