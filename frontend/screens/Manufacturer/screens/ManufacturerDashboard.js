import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import GreenButton from '../../../components/GreenButton';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ItemOrderService from '../../../services/ItemOrder.Service';
import MaterialOrderService from '../../../services/MaterialOrder.Service';
import ManufacturerService from '../../../services/Manufacturer.Service';

export default function ManufacturerDashboard() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('received');

  const [placedOrders, setPlacedOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [manufacturer, setManufacturer] = useState({});

  useEffect(() => {
    try {
      AsyncStorage.getItem('id').then((value) => {
        ItemOrderService.getItemOrderByManufacturerId(value)
          .then((value) => {
            setPlacedOrders(value.data || []);
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
        MaterialOrderService.getMaterialOrderByManufacturer(value)
          .then((value) => {
            setReceivedOrders(value.data || []);
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });

        ManufacturerService.getManufacturer(value)
          .then((value) => {
            setManufacturer(value.data || {});
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    starIcons.push(
      <Text key={i} style={{ color: i <= 1 ? 'gold' : 'blue', fontSize: 20 }}>
        ⭐
      </Text>
    );
  }


  function goToOrders() {
    if (activeTab === 'received') {
      navigation.navigate('ReceivedOrderList');
    } else {
      navigation.navigate('PlacedOrderList');
    }
  }


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
                  activeTab === 'received' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('received')}
              >
                <Text style={styles.tabText}>Received Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabItem,
                  activeTab === 'placed' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('placed')}
              >
                <Text style={styles.tabText}>Placed Orders</Text>
              </TouchableOpacity>
            </View>

            {/* Content for the active tab goes here */}
            {activeTab === 'received' ? (
              // Content for the "Ongoing Orders" tab
              <>
                <View style={styles.table}>
                  {/* Data rows */}
                  {receivedOrders.length > 0 && receivedOrders.map((order, index) => {
                    return (
                      <View key={index} style={styles.row}>
                        <Text style={styles.cellMain}>{order.supplier.companyName}</Text>
                        <Text style={styles.cell}>$ {order.totalPrice}</Text>
                        <Text style={styles.cell}>{order.totalPrice}</Text>
                      </View>
                    );
                  })}
                </View>
              </>
            ) : (
              // Content for the "Completed Orders" tab
              <>
                <View style={styles.table}>
                  {/* Data rows */}

                  {placedOrders.length > 0 && placedOrders.map((order, index) => {
                    return (
                      <View key={index} style={styles.row}>
                        <Text style={styles.cellMain}>{order.seller.companyName}</Text>
                        <Text style={styles.cell}>$ {order.totalPrice}</Text>
                        <Text style={styles.cell}>{order.totalPrice}</Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>
          <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={goToOrders} />
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
              <Text style={styles.profileMainText}>{manufacturer.fname} {manufacturer.lname}</Text>
              <Text style={styles.profileSubText}>{manufacturer.email} </Text>
              <Text style={styles.profileSubText}>{manufacturer.companyName} </Text>
            </View>
            <View style={styles.column}>
              <GreenButton style={styles.viewOrdersButton} title="PROFILE" onPress={() => { navigation.navigate('Profile') }} />
            </View>
          </View>
        </View>
        <View style={styles.levelAndRatingContainer}>

          {/* item + level */}
          <View style={styles.innnerContainer}>
            <View style={styles.column}>
              <GreenButton style={styles.itemBtn} title="ITEMS" onPress={() => { navigation.navigate('Items') }} />
              <Text style={styles.levelTitle}>Level</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="score" size={40} color="#14D2B8" />
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{manufacturer.level} </Text>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.titleUnderline}>
                <Text style={styles.sectionTitle}>My Level</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Rating</Text>
                <Text style={styles.ratingNo}>{manufacturer.rating}</Text>
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