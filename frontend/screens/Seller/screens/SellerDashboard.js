import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DashboardPieChart from '../../../components/DashboardPieChart';
import GreenButton from '../../../components/GreenButton';
import { useNavigation } from '@react-navigation/core';

const SellerDashboard = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>DASHBOARD</Text>
            <View style={styles.pieChartContainer}>
            <View style={styles.titleUnderline}>
                <Text style={styles.sectionTitle}>My Orders</Text>
                </View>
                <DashboardPieChart/>
                <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={() => {navigation.navigate('ORDERS')}} />
            </View>
            <View style={styles.profileBriefContainer}>
            <View style={styles.titleUnderline}>
                <Text style={styles.sectionTitle}>My Profile</Text>
                </View>
                {/* Add your Profile Brief information here */}
            </View>
            <View style={styles.levelAndRatingContainer}>
            <View style={styles.titleUnderline}>
                <Text style={styles.sectionTitle}>My Level</Text>
                </View>
                {/* Add your level and rating details here */}
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
        shadowColor:'#14D2B8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SellerDashboard;
