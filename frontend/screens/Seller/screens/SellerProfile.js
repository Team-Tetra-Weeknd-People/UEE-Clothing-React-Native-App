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

const SellerProfile = () => {
  const [seller, setSeller] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    try{
      AsyncStorage.getItem('seller').then((value) => {
        setSeller(JSON.parse(value));
        setFirstName(JSON.parse(value).fname);
        setLastName(JSON.parse(value).lname);
        setCompanyName(JSON.parse(value).companyName);
        console.log(value);
      });
    }catch(e){
      console.log(e);
    }
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    // You can add code here to save the changes to your backend
    toggleEditing();
  };

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
                value={seller.fname}
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
                value={seller.lname}
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
                value={seller.companyName}
                onChangeText={(text) => setCompanyName(text)}
              />
            ) : (
              <Text style={styles.value}>{companyName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{seller.email}</Text>
          </View>
        </View>
        {isEditing && (
          <View style={styles.greenButton}>
          <GreenButton onPress={saveChanges} title="Save Changes" /></View>
        )}
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

export default SellerProfile;
