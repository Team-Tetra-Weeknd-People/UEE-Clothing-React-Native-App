import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderScreens/OrderList';
import OrderAndChecklist from './OrderScreens/OrderAndChecklist';

const Stack = createNativeStackNavigator();

const SellerOrder = () => {
    return (
        <Stack.Navigator
            initialRouteName='OrderList'
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="OrderList" component={OrderList} />
            <Stack.Screen name="OrderDetails" component={OrderAndChecklist} />
        </Stack.Navigator>
    );
};
export default SellerOrder;
