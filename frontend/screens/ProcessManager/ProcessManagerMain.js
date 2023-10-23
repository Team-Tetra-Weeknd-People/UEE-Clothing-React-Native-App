import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProcessManagerDashboard from "./screens/ProcessManagerDashboard";
import ProcessManagerOrders from "./screens/ProcessManagerOrders";
import ProcessManagerProfile from "./screens/ProcessManagerProfile";
import ProcessManagerJourney from "./screens/ProcessManagerJourney";
import { useNavigation } from "@react-navigation/native";

//Screen names
const PROCESS_MANAGER_DASHBOARD = "Dashboard";
const PROCESS_MANAGER_ORDERS = "Orders";
const PROCESS_MANAGER_PROFILE = "Profile";
const PROCESS_MANAGER_JOURNEY = "Journey";

const Tab = createBottomTabNavigator();

export default function ProcessManagerMain() {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            initialRouteName={PROCESS_MANAGER_DASHBOARD}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    color = focused ? '#14D2B8' : '#1D1D27';

                    if (rn === PROCESS_MANAGER_DASHBOARD.toUpperCase()) {
                        iconName = focused ? 'grid' : 'grid-outline';

                    } else if (rn === PROCESS_MANAGER_ORDERS.toUpperCase()) {
                        iconName = focused ? 'layers' : 'layers-outline';

                    } else if (rn === PROCESS_MANAGER_PROFILE.toUpperCase()) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';

                    } else if (rn === PROCESS_MANAGER_JOURNEY.toUpperCase()) {
                        iconName = focused ? 'pulse' : 'pulse-outline';
                        

                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#14D2B8',
                tabBarInactiveTintColor: '#1D1D27',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1},
                tabBarStyle: { padding: 10, height: 75 },
                tabBarHideOnKeyboard: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#1D1D27',
                    height: 25,
                },
                headerShown: true,
                headerTitle: () => (
                    <Text style={{
                        fontSize: 13,
                        color: 'red',
                        fontFamily: 'Montserrat-SemiBold',
                        letterSpacing: 1,
                        flex: 1
                    }}>
                        Seller
                    </Text>
                ),
            })}>
            <Tab.Screen name={PROCESS_MANAGER_DASHBOARD.toUpperCase()} component={ProcessManagerDashboard} />
            <Tab.Screen name={PROCESS_MANAGER_ORDERS.toUpperCase()} component={ProcessManagerOrders} />
            <Tab.Screen name={PROCESS_MANAGER_JOURNEY.toUpperCase()} component={ProcessManagerJourney} />
            <Tab.Screen name={PROCESS_MANAGER_PROFILE.toUpperCase()} component={ProcessManagerProfile}/>
        </Tab.Navigator>
    )
}