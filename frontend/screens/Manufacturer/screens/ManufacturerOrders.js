import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PlacedMarkAsDefect from './OrderScreens/Placed/MarkAsDefect';
import PlacedOrderCheckList from './OrderScreens/Placed/OrderCheckList';
import PlacedOrderList from './OrderScreens/Placed/OrderList';

import ReceivedOrderCheckList from './OrderScreens/Received/OrderCheckList';
import ReceivedOrderList from './OrderScreens/Received/OrderList';

const Stack = createNativeStackNavigator();

export default function ManufacturerOrders() {
  return (
    <>
      <Stack.Navigator
        initialRouteName='ReceivedOrderList'
        screenOptions={{ headerShown: false, }}
      >
        <Stack.Screen name="PlacedOrderList" component={PlacedOrderList} />
        <Stack.Screen name="PlacedOrderCheckList" component={PlacedOrderCheckList} />
        <Stack.Screen name="PlacedMarkAsDefect" component={PlacedMarkAsDefect} />
        <Stack.Screen name="ReceivedOrderList" component={ReceivedOrderList} />
        <Stack.Screen name="ReceivedOrderCheckList" component={ReceivedOrderCheckList} />
      </Stack.Navigator>
    </>
  );
}
