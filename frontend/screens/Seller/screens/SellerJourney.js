import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JourneyLanding from './JourneyScreens/JourneyLanding';

const Stack = createNativeStackNavigator();

const SellerJourney = () => {
    return (
        <Stack.Navigator
            initialRouteName='JourneyLanding'
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name="JourneyLanding" component={JourneyLanding}/>
        </Stack.Navigator>
    );
};
export default SellerJourney;
