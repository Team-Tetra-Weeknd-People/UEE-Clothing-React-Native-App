import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import SellerDashboard from "./screens/SellerDashboard";
import SellerOrders from "./screens/SellerOrders";
import SellerProfile from "./screens/SellerProfile";
import SellerJourney from "./screens/SellerJourney";
import { useNavigation } from "@react-navigation/native";

//Screen names
const SELLER_DASHBOARD = "Dashboard";
const SELLER_ORDERS = "Orders";
const SELLER_PROFILE = "Profile";
const SELLER_JOURNEY = "Journey";

const Tab = createBottomTabNavigator();

export default function SellerMain() {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            initialRouteName={SELLER_DASHBOARD}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    color = focused ? '#14D2B8' : '#1D1D27';

                    if (rn === SELLER_DASHBOARD.toUpperCase()) {
                        iconName = focused ? 'grid' : 'grid-outline';

                    } else if (rn === SELLER_ORDERS.toUpperCase()) {
                        iconName = focused ? 'layers' : 'layers-outline';

                    } else if (rn === SELLER_PROFILE.toUpperCase()) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';

                    } else if (rn === SELLER_JOURNEY.toUpperCase()) {
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
            <Tab.Screen name={SELLER_DASHBOARD.toUpperCase()} component={SellerDashboard} />
            <Tab.Screen name={SELLER_ORDERS.toUpperCase()} component={SellerOrders} />
            <Tab.Screen name={SELLER_JOURNEY.toUpperCase()} component={SellerJourney} />
            <Tab.Screen name={SELLER_PROFILE.toUpperCase()} component={SellerProfile} />
        </Tab.Navigator>
    )
}