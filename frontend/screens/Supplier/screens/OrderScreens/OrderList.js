
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialOrderService from '../../../../services/MaterialOrder.Service';

export default function OrderList() {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            AsyncStorage.getItem('id').then((value) => {
                MaterialOrderService.getMaterialOrderBySupplier(value)
                    .then((value) => {
                        setOrders(value.data || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching orders:', error);
                    });
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    // Filter orders based on the search text
    const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <FontAwesome5 name="search" size={18} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Orders"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            {/* Headers */}
            <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>MANUFACTURER</Text>
                <Text style={styles.valueHeader}>VALUE</Text>
                <Text style={styles.statusHeader}>STATUS</Text>
                <Text style={styles.QACell}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            </View>
            {/* Body */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.tableRow} onPress={() => {
                        navigation.navigate('OrderCheckList', { order: item });
                    }}>
                        <Text style={styles.manufacturerCell}>{item.manufacturer.companyName}</Text>
                        <Text style={styles.valueCell}>${item.totalPrice}</Text>
                        <Text style={styles.statusCell}>{item.status}</Text>
                        <Text style={styles.QACell}>{item.QAComplain.length > 0 ? (<><MaterialIcons name="error" size={20} color="red" /></>) : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#EDEEEF',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#EDEEEF',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        paddingLeft: 5,
        paddingRight: 7,
    },
    searchBar: {
        flex: 1,
        height: 40,
        fontSize: 16,
        fontFamily: 'Aldrich-Regular',
        color: '#1D1D27',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#14D2B8',
    },
    manufacturerHeader: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        color: '#14D2B8',
        textAlign: 'center',
    },
    supplierHeader: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        color: '#14D2B8',
        textAlign: 'center',
    },
    valueHeader: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        color: '#14D2B8',
        textAlign: 'center',
    },
    statusHeader: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        color: '#14D2B8',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 20,
    },
    manufacturerCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    supplierCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    valueCell: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    statusCell: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
});
