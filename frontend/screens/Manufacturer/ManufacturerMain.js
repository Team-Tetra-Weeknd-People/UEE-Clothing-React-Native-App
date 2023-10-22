import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

// Screens
import ManufacturerDashboard from "./screens/ManufacturerDashboard";
import ManufacturerOrders from "./screens/ManufacturerOrders";
import ManufacturerProfile from "./screens/ManufacturerProfile";
import ManufacturerJourney from "./screens/ManufacturerJourney";

//Screen names
const MANUFACTURER_DASHBOARD = "Dashboard";
const MANUFACTURER_ORDERS = "Orders";
const MANUFACTURER_PROFILE = "Profile";
const MANUFACTURER_JOURNEY = "Journey";

const Tab = createBottomTabNavigator();

export default function ManufacturerMain() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName={MANUFACTURER_DASHBOARD}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          color = focused ? "#14D2B8" : "#1D1D27";

          if (rn === MANUFACTURER_DASHBOARD) {
            iconName = focused ? "grid" : "grid-outline";
          } else if (rn === MANUFACTURER_ORDERS) {
            iconName = focused ? "layers" : "layers-outline";
          } else if (rn === MANUFACTURER_PROFILE) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (rn === MANUFACTURER_JOURNEY) {
            iconName = focused ? "pulse" : "pulse-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#14D2B8",
        tabBarInactiveTintColor: "#1D1D27",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 12,
          fontFamily: "Montserrat-SemiBold",
        },
        tabBarStyle: { padding: 10, height: 75 },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1D1D27",
          height: 25,
        },
        headerShown: true,
        headerTitle: () => (
          <Text
            style={{
              fontSize: 13,
              color: "red",
              fontFamily: "Montserrat-SemiBold",
              letterSpacing: 1,
              flex: 1,
            }}
          >
            MANUFACTURER
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name={MANUFACTURER_DASHBOARD}
        component={ManufacturerDashboard}
      />
      <Tab.Screen name={MANUFACTURER_ORDERS} component={ManufacturerOrders} />
      <Tab.Screen name={MANUFACTURER_JOURNEY} component={ManufacturerJourney} />
      <Tab.Screen name={MANUFACTURER_PROFILE} component={ManufacturerProfile} />
    </Tab.Navigator>
  );
}
