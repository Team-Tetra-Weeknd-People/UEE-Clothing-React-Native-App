import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderScreens/OrderList';
import OrderCheckList from './OrderScreens/OrderCheckList';

const Stack = createNativeStackNavigator();

export default function SupplierOrders() {
    return (
        <>
            <Stack.Navigator
                initialRouteName='OrderList'
                screenOptions={{ headerShown: false, }}
            >
                <Stack.Screen name="OrderList" component={OrderList} />
                <Stack.Screen name="OrderCheckList" component={OrderCheckList} />
            </Stack.Navigator>

        </>
    )
}