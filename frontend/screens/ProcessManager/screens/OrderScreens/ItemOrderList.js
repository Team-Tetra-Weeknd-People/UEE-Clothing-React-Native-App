import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemOrderService from '../../../../services/ItemOrder.Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderList = () => {
    

    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [manager, setManager] = useState({});
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [selectedType, setSelectedType] = useState("MATERIAL");
    const [fetchTimeout, setFetchTimeout] = useState(null);

    const orderTypes = ["MATERIAL", "ITEM"];
    
    const selectType = (type) => {
        setSelectedType(type);
      }
  
    useEffect(() => {
        try {
            AsyncStorage.getItem('processmanager').then((value) => {
                setManager(JSON.parse(value));
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if (fetchTimeout) {
          clearTimeout(fetchTimeout); // Clear the previous timeout if it exists
        }
        setRefreshing(true);
        const timeoutId = setTimeout(() => {
          ItemOrderService.getItemOrders()
            .then((res) => {
              setOrders(res.data);
              setIsFontLoaded(true);
            })
            .catch((error) => {
              console.error('Error fetching item orders:', error);
            })
            .finally(() => {
              setRefreshing(false);
            });
        }, 2000); // Adjust the delay as needed
        setFetchTimeout(timeoutId);
      }, []);
        useEffect(() => {
            ItemOrderService.getItemOrders()
            .then((res) => {
                setOrders(res.data);
                setIsFontLoaded(true);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    // Filter orders based on the search text
    const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchText.toLowerCase())
    );

    const toOrderDetails = (id) => {
        navigation.navigate('OrderDetails', { orderId: id});
    };
    if (!isFontLoaded) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1D1D27" />
          </View>
        );
      }
    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <FontAwesome5 name="search" size={18} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Item Orders"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            {/* Headers */}
            <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>MANUFACTURER</Text>
                <Text style={styles.supplierHeader}>SUPPLIER</Text>
                <Text style={styles.valueHeader}>VALUE</Text>
                <Text style={styles.statusHeader}>STATUS</Text>
            </View>
            {/* Body */}
            <FlatList
             refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
                data={filteredOrders}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.tableRow} onPress={()=>{toOrderDetails(item._id)}}>
                        <Text style={styles.manufacturerCell}>{item.manufacturer.companyName}</Text>
                        <Text style={styles.supplierCell}>{item.supplier.companyName}</Text>
                        <Text style={styles.valueCell}>${item.totalPrice}</Text>
                        <Text style={styles.statusCell}>{item.status}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
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
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white", // Change the background color as needed
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
    
    export default OrderList;