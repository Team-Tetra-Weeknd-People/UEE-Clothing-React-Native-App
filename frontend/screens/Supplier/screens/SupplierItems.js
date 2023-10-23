import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ItemList from './ItemScreens/ItemList';
import ViewItem from './ItemScreens/ViewItem';
import AddQA from './ItemScreens/AddQA';
import EditQA from './ItemScreens/EditQA';

const Stack = createNativeStackNavigator();

export default function SupplierItems() {
    return (
        <>
            <Stack.Navigator
                initialRouteName='ItemList'
                screenOptions={{ headerShown: false, }}
            >
                <Stack.Screen name="ItemList" component={ItemList} />
                <Stack.Screen name="AddQA" component={AddQA} />
                <Stack.Screen name="EditQA" component={EditQA} />
                <Stack.Screen name="ViewItem" component={ViewItem} />
            </Stack.Navigator>
        </>
    )
}