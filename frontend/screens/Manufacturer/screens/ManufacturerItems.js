import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ItemList from './ItemScreens/ItemList';
import ItemView from './ItemScreens/ItemView';
import AddQA from './ItemScreens/AddQA';
import EditQA from './ItemScreens/EditQA';

const Stack = createNativeStackNavigator();


export default function ManufacturerItems() {
  return (
    <>
      <Stack.Navigator
        initialRouteName='ItemList'
        screenOptions={{ headerShown: false, }}
      >
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="AddQA" component={AddQA} />
        <Stack.Screen name="EditQA" component={EditQA} />
        <Stack.Screen name="ItemView" component={ItemView} />
      </Stack.Navigator>
    </>
  )
}