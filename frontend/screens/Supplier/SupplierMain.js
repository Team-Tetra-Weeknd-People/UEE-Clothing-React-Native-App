import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigation } from "@react-navigation/native";

// Screens
import SupplierDashboard from "./screens/SupplierDashboard";
import SupplierOrders from "./screens/SupplierOrders";
import SupplierProfile from "./screens/SupplierProfile";
import SupplierItems from "./screens/SupplierItems";

//Screen names
const SUPPLIER_DASHBOARD = "Dashboard";
const SUPPLIER_ORDERS = "Orders";
const SUPPLIER_PROFILE = "Profile";
const SUPPLIER_ITEMS = "Materials";

const Tab = createBottomTabNavigator();

export default function SupplierMain() {

  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        initialRouteName={SUPPLIER_DASHBOARD}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            color = focused ? '#14D2B8' : '#1D1D27';

            if (rn === SUPPLIER_DASHBOARD.toUpperCase()) {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (rn === SUPPLIER_ORDERS.toUpperCase()) {
              iconName = focused ? 'layers' : 'layers-outline';
            } else if (rn === SUPPLIER_ITEMS.toUpperCase()) {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (rn === SUPPLIER_PROFILE.toUpperCase()) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#14D2B8',
          tabBarInactiveTintColor: '#1D1D27',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1 },
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
              Supplier
            </Text>
          ),
        })}>
        <Tab.Screen name={SUPPLIER_DASHBOARD.toUpperCase()} component={SupplierDashboard} />
        <Tab.Screen name={SUPPLIER_ORDERS.toUpperCase()} component={SupplierOrders} />
        <Tab.Screen name={SUPPLIER_ITEMS.toUpperCase()} component={SupplierItems} />
        <Tab.Screen name={SUPPLIER_PROFILE.toUpperCase()} component={SupplierProfile} />
      </Tab.Navigator>
    </>
  );
}
