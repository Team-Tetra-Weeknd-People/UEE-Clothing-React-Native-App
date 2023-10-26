import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JourneyLanding from './JourneyScreens/JourneyLanding';
import JourneyManufacturerChecklist from './JourneyScreens/JourneyManufacturerChecklist';
import JourneyManufacturerDefects from './JourneyScreens/JourneyManufacturerDefects';
import JourneySupplierChecklist from './JourneyScreens/JourneySupplierChecklist';
import JourneySupplierDefects from './JourneyScreens/JourneySupplierDefects';

const Stack = createNativeStackNavigator();

const ProcessManagerJourney = () => {
    return (
        <Stack.Navigator
            initialRouteName='JourneyLanding'
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="JourneyLanding" component={JourneyLanding}/>
            <Stack.Screen name="JourneyManufacturerChecklist" component={JourneyManufacturerChecklist}/>
            <Stack.Screen name="JourneyManufacturerDefects" component={JourneyManufacturerDefects}/>
            <Stack.Screen name="JourneySupplierChecklist" component={JourneySupplierChecklist}/>
            <Stack.Screen name="JourneySupplierDefects" component={JourneySupplierDefects}/>
        </Stack.Navigator>
    );
};
export default ProcessManagerJourney;