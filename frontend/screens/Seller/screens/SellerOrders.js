import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderScreens/OrderList';
import OrderAndChecklist from './OrderScreens/OrderAndChecklist';
import MarkAsDefect from './OrderScreens/MarkAsDefect';

const Stack = createNativeStackNavigator();

const SellerOrder = () => {
    return (
        <Stack.Navigator
            initialRouteName='OrderList'
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="OrderList" component={OrderList} />
            <Stack.Screen name="OrderDetails" component={OrderAndChecklist} />
            <Stack.Screen name="MarkAsDefect" component={MarkAsDefect} />
        </Stack.Navigator>
    );
};
export default SellerOrder;
