import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import DashboardPieChart from '../../../components/DashboardPieChart';
import GreenButton from '../../../components/GreenButton';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const SellerDashboard = () => {
    const [seller, setSeller] = useState({});
    const [isFontLoaded, setIsFontLoaded] = useState(false); // Define isFontLoaded state

    useFocusEffect(
        useCallback(() => {
        try {
            // Use AsyncStorage to retrieve seller data
            AsyncStorage.getItem('seller').then((value) => {
                setSeller(JSON.parse(value));
            });
        } catch (e) {
            console.log(e);
        }
    }, []));
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>DASHBOARD</Text>
            <View style={styles.pieChartContainer}>
                <View style={styles.titleUnderline}>
                    <Text style={styles.sectionTitle}>My Orders</Text>
                </View>
                <DashboardPieChart />
                <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={() => { navigation.navigate('ORDERS') }} />
            </View>
            <View style={styles.profileBriefContainer}>
                <View style={styles.titleUnderline}>
                    <Text style={styles.sectionTitle}>My Profile</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <Ionicons name="person-circle-outline" size={50} color="#1D1D27" />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}>{seller.fname} {seller.lname}</Text>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: '#14D2B8' }}>{seller.email}</Text>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: '#14D2B8' }}>{seller.companyName}</Text>
                    </View>
                    <GreenButton style={styles.viewOrdersButton} title="PROFILE" onPress={() => { navigation.navigate('PROFILE') }} />
                </View>
            </View>
            <View style={styles.levelAndRatingContainer}>
                <View style={styles.titleUnderline}>
                    <Text style={styles.sectionTitle}>My Level</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}>Level</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, marginRight: 115 }}>Rating
                    <FontAwesome name="star" size={16} color="gold" />  
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/images/lvl.png')} style={{ width: 40, height: 40 }} />
                        <Text style={styles.levelText}>{seller.level}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="star" size={40} color="gold" />
                        <FontAwesome name="star" size={40} color="gold" />
                        <FontAwesome name="star" size={40} color="gold" />
                        <FontAwesome name="star" size={40} color="gold" />
                        <FontAwesome name="star-half-full" size={40} color="gold" />
                        </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        letterSpacing: 1.5,
    },
    sectionTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginVertical: 2,
    },
    titleUnderline: {
        borderBottomWidth: 3,
        borderBottomColor: '#1D1D27',
        width: 'auto',
        alignSelf: 'flex-end',
    },
    viewOrdersButton: {
        width: 'auto',
        alignSelf: 'center',
        shadowColor: '#1D1D27',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pieChartContainer: {
        paddingTop: 5,
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
    },
    profileBriefContainer: {
        paddingTop: 5,
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
    },
    levelAndRatingContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingTop: 5,
        marginVertical: 10,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    levelText: {
        fontFamily: 'Montserrat-Bold', 
        fontSize: 30, 
        color: "white",
         marginHorizontal: 10,
         backgroundColor: "#14D2B8",
         paddingHorizontal: 10,
         borderRadius: 10,
    }
});

export default SellerDashboard;
