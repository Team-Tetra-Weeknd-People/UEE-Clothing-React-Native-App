import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import GreenButton from '../../../components/GreenButton';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialOrderService from '../../../services/MaterialOrder.Service';
import SupplierService from '../../../services/Supplier.Service';

export default function SupplierDashboard() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('completed');

  const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState({});

  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    starIcons.push(
      <Text key={i} style={{ color: i <= 1 ? 'gold' : 'blue', fontSize: 20 }}>
        ⭐
      </Text>
    );
  }

  useEffect(() => {
    AsyncStorage.getItem('id').then((value) => {
      MaterialOrderService.getMaterialOrderBySupplier(value).then((response) => {
        setOrders(response.data);
      });
      SupplierService.getSupplier(value).then((response) => {
        setSupplier(response.data);
      });
    });
  }, []);

  return (

    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>DASHBOARD</Text>
        {/* order container */}
        <View style={styles.pieChartContainer}>
          <View>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabItem,
                  activeTab === 'ongoing' && styles.activeTab,
                ]}
              >

              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabItem,
                  activeTab === 'completed' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('completed')}
              >
                <Text style={styles.tabText}>Completed Orders</Text>
              </TouchableOpacity>
            </View>

            {/* Content for the active tab goes here */}
            {activeTab === 'ongoing' ? (
              // Content for the "Ongoing Orders" tab
              <>
                {table("ongoing ")}
              </>
            ) : (
              // Content for the "Completed Orders" tab
              <>
                <View style={styles.table}>
                  {/* Data rows */}
                  {orders.length > 0 && orders.slice(0, 3).map((order, index) => {
                    return (
                      <View key={index} style={styles.row}>
                        <Text style={styles.cellMain}>{order.supplier.companyName}</Text>
                        <Text style={styles.cell}>$ {order.totalPrice}</Text>
                        <Text style={styles.cell}>{order.status}</Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>
          <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={() => { navigation.navigate('ORDERS') }} />
        </View>

        {/* profile brief */}
        <View style={styles.profileBriefContainer}>
          <View style={styles.titleUnderline}>
            <Text style={styles.sectionTitle}>My Profile</Text>
          </View>
          <View style={styles.innnerContainer}>
            <View style={styles.column}>
              <FontAwesome name="user-circle" size={55} color="black" style={{ marginTop: 10 }} />
            </View>
            <View>
              <Text style={styles.profileMainText}>{supplier.fname} {supplier.lname}</Text>
              <Text style={styles.profileSubText}>{supplier.email}</Text>
              <Text style={styles.profileSubText}>{supplier.companyName}</Text>
            </View>
            <View style={styles.column}>
              <GreenButton style={styles.viewOrdersButton} title="PROFILE" onPress={() => { navigation.navigate('PROFILE') }} />
            </View>
          </View>
        </View>
        <View style={styles.levelAndRatingContainer}>

          {/* item + level */}
          <View style={styles.innnerContainer}>
            <View style={styles.column}>
              <GreenButton style={styles.itemBtn} title="ITEMS" onPress={() => { navigation.navigate('ITEMS') }} />
              <Text style={styles.levelTitle}>Level</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="score" size={40} color="#14D2B8" />
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{supplier.level}</Text>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.titleUnderline}>
                <Text style={styles.sectionTitle}>My Level</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Rating</Text>
                <Text style={styles.ratingNo}>{supplier.rating}</Text>
              </View>
              <View style={styles.ratingStar}>
                {starIcons}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}


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
  },
  titleUnderline: {
    borderBottomWidth: 3,
    borderBottomColor: '#1D1D27',
    width: 'auto',
    alignSelf: 'flex-end',
  },
  viewOrdersButton: {
    marginTop: 10,
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
    minHeight: 250,
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
    minHeight: 150,
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
    minHeight: 180,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1D1D27',
    width: 'auto',
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,// You can define a style for the active tab
  },
  tabText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  innnerContainer: {
    flex: 1, // This makes it a flex container, taking the full width of the screen
    flexDirection: 'row', // Arranges the columns horizontally
    marginTop: 10,
  },
  column: {
    flex: 1, // Each column takes an equal amount of available space
  },
  profileMainText: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  profileSubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#14D2B8',
    fontWeight: 'bold',
  },
  itemBtn: {
    marginTop: 10,
    width: 100,
    shadowColor: '#1D1D27',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginVertical: 2,
    marginTop: 10,
  },
  ratingTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginVertical: 2,
    marginTop: 30,
    marginLeft: 30,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTitle: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  ratingNo: {
    marginTop: 30,
    marginLeft: 30,
    fontWeight: 'bold',
    color: 'gold',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  ratingStar: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 30,
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    padding: 10,
  },
  cell: {
    flex: 1,
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
  cellMain: {
    flex: 3,
    fontFamily: 'Montserrat-SemiBold',
  }
});