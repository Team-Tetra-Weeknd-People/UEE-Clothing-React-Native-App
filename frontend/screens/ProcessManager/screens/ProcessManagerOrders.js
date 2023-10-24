import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderScreens/OrderList';
import OrderAndCheckList from './OrderScreens/OrderAndCheckList';
// import MarkAsDefect from './OrderScreens/MarkAsDefect';

const Stack = createNativeStackNavigator();

const ProcessManagerOrders = () => {
    return (
        <Stack.Navigator
            initialRouteName='OrderList'
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="OrderList" component={OrderList} />
            <Stack.Screen name="OrderDetails" component={OrderAndCheckList} />
            {/* <Stack.Screen name="MarkAsDefect" component={MarkAsDefect} /> */}
        </Stack.Navigator>
    );
};
export default ProcessManagerOrders;
