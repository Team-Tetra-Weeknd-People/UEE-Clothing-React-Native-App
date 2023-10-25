import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import GreenButton from '../../../components/GreenButton';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemOrderService from '../../../services/ItemOrder.Service';
import MaterialOrderService from '../../../services/MaterialOrder.Service';
import ManufacturerService from '../../../services/Manufacturer.Service';
import SupplierService from '../../../services/Supplier.Service';

export default function ProcessManagerDashboard() {
  const navigation = useNavigation();
  const [manager, setManager] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);


  useEffect(() => {
    try{
      AsyncStorage.getItem('processmanager').then((value) => {
        setManager(JSON.parse(value));
        setFirstName(JSON.parse(value).fname);
        setLastName(JSON.parse(value).lname);
        setCompanyName(JSON.parse(value).companyName);
        console.log(value);
      });
    }catch(e){
      console.log(e);
    }
  }, []);

  useEffect(() => {
    ManufacturerService.getManufacturers()
    .then((res) => {
        setManufacturers(res.data);
    })
    .catch((error) => {
        console.error('Error fetching orders:', error);
    });
}, [manufacturers]);

  useEffect(() => {
    SupplierService.getSuppliers()
    .then((res) => {
        setSuppliers(res.data);
    })
    .catch((error) => {
        console.error('Error fetching orders:', error);
    });
  }, [suppliers]);

  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    starIcons.push(
      <Text key={i} style={{ color: i <= 1 ? 'gold' : 'blue', fontSize: 20 }}>
        ⭐
      </Text>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>DASHBOARD</Text>
        {/* order container */}
        <View style={styles.pieChartContainer}>
          <View>
              <Text style={styles.subtitle}>MANUFACTURERS</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>NAME</Text>
                <Text style={styles.supplierHeader}>LEVEL</Text>
                <Text style={styles.valueHeader}>POINTS</Text>
                </View>
                {/* Body */}
                <FlatList
                //  refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                //   }
                    data={manufacturers}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.tableRow} >
                            <Text style={styles.manufacturerCell}>{item.companyName}</Text>
                            <Text style={styles.supplierCell}>{item.level}</Text>
                            <Text style={styles.valueCell}>{item.points}</Text>
                        </TouchableOpacity>
                    )}
                />
          </View>
          {/* <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={() => { navigation.navigate('ORDERS') }} /> */}
        </View>
        <View style={styles.pieChartContainer}>
          <View>
          <Text style={styles.subtitle}>SUPPLIERS</Text>
          <View style={styles.tableHeader}>
                <Text style={styles.manufacturerHeader}>NAME</Text>
                <Text style={styles.supplierHeader}>LEVEL</Text>
                <Text style={styles.valueHeader}>POINTS</Text>
                </View>
                {/* Body */}
                <FlatList
                //  refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                //   }
                    data={suppliers}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.tableRow} >
                            <Text style={styles.manufacturerCell}>{item.companyName}</Text>
                            <Text style={styles.supplierCell}>{item.level}</Text>
                            <Text style={styles.valueCell}>{item.points}</Text>
                        </TouchableOpacity>
                    )}
                />
          </View>
          {/* <GreenButton style={styles.viewOrdersButton} title="View Orders" onPress={() => { navigation.navigate('ORDERS') }} /> */}
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
              <Text style={styles.profileMainText}>{firstName} {lastName}</Text>
              {/* <Text style={styles.profileSubText}>[]</Text> */}
              <Text style={styles.profileSubText}>{companyName}</Text>
            </View>
            <View style={styles.column}>
              <GreenButton style={styles.viewOrdersButton} title="PROFILE" onPress={() => { navigation.navigate('PROFILE') }} />
            </View>
          </View>
        </View>
      </View>
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
  subtitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
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
    minHeight: 200,
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
});