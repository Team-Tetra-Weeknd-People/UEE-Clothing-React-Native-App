import React, { useState, useEffect, useCallback } from 'react';
import { Button, Image, Text, View, TextInput, Platform, ScrollView, RefreshControl, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ItemQAComplaintsService from '../../../../services/ItemQAComplaints.Service';
import ItemQAService from '../../../../services/ItemQA.service';
import BigSlateButton from '../../../../components/BigSlateButton';
import { Entypo, Ionicons } from '@expo/vector-icons';
import GreenButton from '../../../../components/GreenButton';
import {firebase} from '../../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const JourneyManufacturerDefects = ({ route }) => {
  const orderId = route.params.orderId;
  const qualityAttributeId = route.params.attributeId;
  const [qulaityAttributeDetails, setQualityAttributesDetails] = useState({});
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [complaint, setComplaint] = useState({});
  const [description, setDescription] = useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [statusLib, requestLibPermission] = ImagePicker.useMediaLibraryPermissions();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navgiation = useNavigation();

  useEffect(() => {
    ItemQAService.getItemQA(qualityAttributeId)
      .then((res) => {
        setQualityAttributesDetails(res.data);
        setIsFontLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [qualityAttributeId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ItemQAComplaintsService.getItemComplaintByQA(qualityAttributeId)
      .then((res) => {
        setImage(res.data[0].image);
        setComplaint(res.data[0]);
        setDescription(res.data[0].complain);
      })
      .catch((error) => {
        setComplaint(null);
      });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [qualityAttributeId]);

  useEffect(() => {
    ItemQAComplaintsService.getItemComplaintByQA(qualityAttributeId)
      .then((res) => {
        setImage(res.data[0].image);
        setComplaint(res.data[0]);
        setDescription(res.data[0].complain);
      })
      .catch((error) => {
        setComplaint(null);
      });
  }, [qualityAttributeId]);


  if (!isFontLoaded) {
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
      <Text style={styles.title}>DEFECT</Text>
      <Text style={styles.subTitle}>ORDER ID : {orderId}</Text>
      <View style={styles.photoContainer}>
      <Text style={styles.defectHeading}>DEFECT : {complaint._id}</Text>
        <Text style={styles.topicText}>SELLER'S REVIEW ON MANUFACTURER'S CHECKLIST</Text>
        {image ?
            <Image source={{ uri: image }} style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 15, borderWidth : 5, borderColor: 'black'}} />
          : <Ionicons name="image-outline" size={200} color="black" style={{ alignSelf: 'center' }} />}
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <Entypo
            name="circle-with-cross"
            size={20}
            color="red"
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={styles.defectHeading}>
            {qulaityAttributeDetails.qaName.toUpperCase()} : {qulaityAttributeDetails.qaDescription.toUpperCase()}</Text>
        </View>
      </View>
      <View>
      
      </View>
      <View style={styles.photoContainer}><Text style={styles.subTitle}>COMPLAINT DESCRIPTION</Text>
        <Text
        style={styles.descriptionInput}>{description}</Text></View>
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
  container: {
    flex: 1,
    padding: 16,
    fontFamily: "Montserrat-Regular",
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    letterSpacing: 1.5,
  },
  subTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginVertical: 2,
  },
  topicText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
},
  photoContainer: {
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
  defectHeading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    alignSelf: 'center',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  noImageText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginVertical: 2,
    alignSelf: 'center',
    color: '#1D1D27',
  },
  picBtns: {
    padding: 10,
    backgroundColor: '#1D1D27',
    borderRadius: 50,
    marginHorizontal: 5,
    shadowColor: '#14D2B8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  descriptionInput: {
    marginVertical: 5,
    fontFamily: 'Montserrat-Regular',
    color: '#1D1D27',
  },
});
export default JourneyManufacturerDefects;
