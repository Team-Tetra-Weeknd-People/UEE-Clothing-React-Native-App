import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SellerMain from "./screens/Seller/SellerMain";
import ManufacturerMain from "./screens/Manufacturer/ManufacturerMain";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white", // Change the background color as needed
    },
  });
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
      });
      setIsFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1D1D27" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1D1D27",
          },
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "Montserrat-Regular",
                paddingTop: 15,
                letterSpacing: 1,
              }}
            >
              MATERIAL INSPECTOR
            </Text>
          ),
        }}
      >
        {/* common header for all screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* seller */}
        <Stack.Screen name="SellerMain" component={SellerMain} />
        {/* manufacturer */}
        <Stack.Screen name="ManufacturerMain" component={ManufacturerMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
