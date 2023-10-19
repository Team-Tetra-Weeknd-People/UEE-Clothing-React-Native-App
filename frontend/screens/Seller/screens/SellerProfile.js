import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SellerProfile = ({ route }) => {
  const { seller } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {seller ? (
        <View>
          <Text>Seller Profile</Text>
          <Text>First Name: {seller.fname}</Text>
          <Text>Last Name: {seller.lname}</Text>
          <Text>Company Name: {seller.companyName}</Text>
          <Text>Email: {seller.email}</Text>
          {/* Add more fields as needed */}
        </View>
      ) : (
        <Text>Error loading seller data.</Text>
      )}
    </View>
  );
};

export default SellerProfile;
