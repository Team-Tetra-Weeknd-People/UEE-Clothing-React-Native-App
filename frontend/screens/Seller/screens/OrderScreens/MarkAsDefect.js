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

const MarkAsDefect = ({ route }) => {
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const storageRef = firebase.storage().ref().child(filename);
    await storageRef.put(blob);

    try {
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage(url);
      const data = {
        QAid: qualityAttributeId,
        image: url,
        complain: description,
        itemOrderID: orderId,
        itemID: qulaityAttributeDetails.itemID
      };
      
      if (complaint != null) {
        ItemQAComplaintsService.updateItemComplaint(complaint._id, data)
          .then((res) => {
            alert('Complaint Updated Successfully');
            navgiation.navigate('OrderDetails', { orderId: orderId});
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
      } else {
        console.log('else ----------------------------------');
        console.log(data);
        ItemQAComplaintsService.createItemComplaint(data).then((res) => {
          ItemQAService.updateItemQA(qualityAttributeId, {
            status: 'Defect',
          }).then((res) => {
            alert('Complaint Created Successfully');
            navgiation.navigate('OrderDetails', { orderId: orderId});
          }
          ).catch((error) => {
            console.error('Error Creating Complaint:', error);
          });
        });
        
      }
    } catch (e) {
      console.log(e);
    }
  };

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
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: image ? 10 : 0 }}>
          <Entypo
            name="circle-with-cross"
            size={20}
            color="red"
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={styles.defectHeading}>
            {qulaityAttributeDetails.qaName.toUpperCase()} : {qulaityAttributeDetails.qaDescription.toUpperCase()}</Text>
        </View>
        {image ?
            <Image source={{ uri: image }} style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 15, borderWidth : 5, borderColor: 'black'}} />
          : <Ionicons name="image-outline" size={200} color="black" style={{ alignSelf: 'center' }} />}
        
      </View>
      <View>
      <Text style={styles.noImageText}>CAPTURE PROOF</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.picBtns} onPress={takePhoto}>
            <Ionicons name="camera" size={50} color="#14D2B8" style={{ alignSelf: 'center', marginHorizontal: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.picBtns} onPress={pickImage}>
            <Ionicons name="image" size={50} color="#14D2B8" style={{ alignSelf: 'center', marginHorizontal: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.photoContainer}><Text style={styles.subTitle}>COMPLAINT DESCRIPTION</Text>
        <TextInput
        style={styles.descriptionInput}
        value={description}
        placeholder="Enter Complaint Description"
        onChangeText={text => setDescription(text)}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      /></View>
      <GreenButton style={{width: 'auto', alignSelf: 'center' , marginVertical: 10, marginBottom: 50}} title="SUBMIT DEFECT" onPress={() => {uploadImage()}} />
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
    borderWidth: 1,
    borderColor: '#ccc9',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontFamily: 'Montserrat-SemiBold',
    color: '#1D1D27',
  },
});
export default MarkAsDefect;
