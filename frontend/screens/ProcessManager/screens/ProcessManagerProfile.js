import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import GreenButton from '../../../components/GreenButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import ManufacturerService from '../../../services/Manufacturer.Service';
import SupplierService from '../../../services/Supplier.Service';
import ItemOrderService from '../../../services/ItemOrder.Service';
import MaterialOrderService from '../../../services/MaterialOrder.Service';

const ProcessManagerProfile = () => {
  const [manager, setManager] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemOrders, setItemOrders] = useState([]);
  const [materialOrders, setMaterialOrders] = useState([]);

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

  useEffect(() => {
    ItemOrderService.getItemOrders()
    .then((res) => {
        setItemOrders(res.data);
    })
    .catch((error) => {
        console.error('Error fetching orders:', error);
    });
}, []);

  useEffect(() => {
    MaterialOrderService.getMaterialOrders()
    .then((res) => {
        setMaterialOrders(res.data);
    })
    .catch((error) => {
        console.error('Error fetching orders:', error);
    });
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    // You can add code here to save the changes to your backend
    toggleEditing();
  };

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello World!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: reportLayout(),
      printerUrl: selectedPrinter?.url, // iOS only
    });
  }

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  const reportLayout = () => {
    let manufacturerTable = '';
    const manufacturerData = [...manufacturers];
    for (let i = 0; i < manufacturerData.length; i++) {
      const item = manufacturerData[i];
      manufacturerTable += `
        <tr>
          <td>${item.companyName || ''}</td>
          <td>${'Level '+ item.level || 'level 0'}</td>
          <td>${item.points + ' points' || '0 points'}</td>
        </tr>
      `;
    }
    console.log(manufacturerTable);

    let supplierTable = '';
    const supplierData = [...suppliers];
    for (let i = 0; i < supplierData.length; i++) {
      const item = supplierData[i];
      supplierTable += `
        <tr>
          <td>${item.companyName || ''}</td>
          <td>${'Level '+ item.level || 'level 0'}</td>
          <td>${item.points + ' points' || '0 points'}</td>
        </tr>
      `;
    }
    console.log(supplierTable);

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
      </head>
      <body>
      <h1>Stakeholder Levels</h1>
      <h2>All Manufacturers</h2>
      
      <table>
        <tr>
          <th>Company</th>
          <th>Current Level</th>
          <th>Current points</th>
        </tr>
        ${manufacturerTable}
      </table>

      <h2>All Suppliers</h2>
      
      <table>
        <tr>
          <th>Company</th>
          <th>Current Level</th>
          <th>Current points</th>
        </tr>
        ${supplierTable}
      </table>
      
      </body>
    </html>
      `;
    return html;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={toggleEditing}>
            <Ionicon name="person-circle-outline" size={100} style={styles.profileImage} />
            <Text style={styles.editText}>Edit Profile</Text>
            {/* <Image
            source={require('./path-to-your-profile-image.png')}
            style={styles.profileImage}
          /> */}
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>First Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={manager.fname}
                onChangeText={(text) => setFirstName(text)}
              />
            ) : (
              <Text style={styles.value}>{firstName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={manager.lname}
                onChangeText={(text) => setLastName(text)}
              />
            ) : (
              <Text style={styles.value}>{lastName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Company</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={manager.companyName}
                onChangeText={(text) => setCompanyName(text)}
              />
            ) : (
              <Text style={styles.value}>{companyName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{manager.email}</Text>
          </View>
        </View>
        {isEditing && (
          <View style={styles.greenButton}>
          <GreenButton onPress={saveChanges} title="Save Changes" /></View>
        )}
      </View>
      <Text style={styles.title}>MANAGER CONTROLS</Text>
      <View style={styles.profileContainer}>
        <GreenButton onPress={print} title="Generate Report" />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileContainer: {
    alignSelf: 'center',
    width: '95%',
    padding: 20,
    borderRadius: 10,
    marginBottom:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  editText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    paddingLeft: 22,
    paddingBottom: 15,
    color: '#14D2B8',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    flex: 1,
  },
  value: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    flex: 2,
  },
  input: {
    color: '#14D2B8',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    flex: 2,
  },
  greenButton: {
    top: 10,
  },
});

export default ProcessManagerProfile;
