import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BigSlateButton from '../../../../components/BigSlateButton';
import { Ionicons } from '@expo/vector-icons';
import ItemOrderService from '../../../../services/ItemOrder.Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JourneyLanding = () => {
    const SUP_UNDER_TEXT = 'View Manufacturer\'s Review on Supplier\'s Checklist';
    const MANU_UNDER_TEXT = 'View Seller\'s Review on Manufacturer\'s Checklist';
    const [orderId, setOrderId] = useState('');

    const [refreshing, setRefreshing] = useState(false);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [order, setOrder] = useState({});

    useEffect(() => {
        AsyncStorage.getItem('orderId').then((value) => {
            setOrderId(value);
        });
    }, []);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      AsyncStorage.getItem('orderId').then((value) => {
        setOrderId(value);
        ItemOrderService.getItemOrderById(value)
        .then((res) => {
            setOrder(res.data);
            setIsFontLoaded(true);
        }).catch((error) => {
            console.error('Error fetching order:', error);
        });
    });
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, [orderId]);

    useEffect(() => {
        AsyncStorage.getItem('orderId').then((value) => {
            setOrderId(value);
            ItemOrderService.getItemOrderById(value)
            .then((res) => {
                setOrder(res.data);
                setIsFontLoaded(true);
            }).catch((error) => {
                console.error('Error fetching order:', error);
            });
        });
    }, []);

    if(orderId == null) {
        return (
            <View style={styles.noOrderId}refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
                <Text style={styles.noOrderIdText}>NO ORDER SELECTED!</Text>
                <Text style={styles.noOrderIdTextReg}>PLEASE SELECT AN ORDER FROM THE ORDERS TAB.</Text>
            </View>
        );
    } else if (!isFontLoaded) {
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
            <Text style={styles.title}>ORDER JOURNEY</Text>
            <Text style={styles.subTitle}>ORDER ID : {order._id}</Text>
            <View style={styles.supplierContainer}>
                <View style={styles.headingOfContainer}>
                    <Text style={styles.sectionTitle}>SUPPLIER</Text>
                    <Text style={styles.supName}>{order.supplier.companyName.toUpperCase()}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <BigSlateButton title="View Checklist" onPress={() => { }} />
                </View>
                <Text style={styles.underText}>{SUP_UNDER_TEXT.toUpperCase()}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <Ionicons name="chevron-down-outline" size={60} color="#52BFA1" />
            </View>
            <View style={styles.manufacturerContainer}>
                <View style={styles.headingOfContainer}>
                    <Text style={styles.sectionTitle}>MANUFACTURER</Text>
                    <Text style={styles.manuName}>{order.manufacturer.companyName.toUpperCase()}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <BigSlateButton title="View Checklist" onPress={() => { }} />
                </View>
                <Text style={styles.underText}>{MANU_UNDER_TEXT.toUpperCase()}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <Ionicons name="chevron-down-outline" size={60} color="#52BFA1"/>
            </View>
            <View style={styles.youContainer}>
                <Text style={styles.sectionTitle}>YOU</Text>
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
      noOrderId: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      },
        noOrderIdText: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            letterSpacing: 1.5,
            textAlign: 'center',
            color: '#1D1D27',
        },
        noOrderIdTextReg: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            letterSpacing: 1.5,
            textAlign: 'center',
            color: '#1D1D27',
        },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        letterSpacing: 1.5,
    },
    subTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        letterSpacing: 1,
        marginBottom: 10,
    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        marginVertical: 2,
        letterSpacing: 1.5,
    },
    supName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        marginVertical: 2,
        letterSpacing: 1,
        alignSelf: 'flex-end',
        color: '#18B428',
        maxWidth: "50%",
    },
    manuName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        marginVertical: 2,
        letterSpacing: 1,
        alignSelf: 'flex-end',
        color: '#1856B4DD',
        maxWidth: "50%",
    },
    headingOfContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    supplierContainer: {
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#18B428',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    manufacturerContainer: {
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#1856B4DD',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        width: 'auto',
        alignSelf: 'center',
        marginTop: 40,
    },
    underText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        marginVertical: 2,
        alignSelf: 'center',
        color: '#1D1D27',
        textAlign: 'center',
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    youContainer: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        paddingBottom: 20,
        paddingHorizontal: 70,
        marginVertical: 10,
        shadowColor: '#1D1D27',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        shadowOpacity: 0.25,
    },
});
export default JourneyLanding;
