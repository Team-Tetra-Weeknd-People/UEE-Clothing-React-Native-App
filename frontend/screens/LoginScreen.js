import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

import ManufacturerService from "../services/Manufacturer.Service";
import SupplierService from "../services/Supplier.Service";
import SellerService from "../services/Seller.Service";
import ProcessManagerService from "../services/ProcessManager.Service";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [selectedType, setSelectedType] = useState("SUPPLIER"); // State to store the selected type

  // Define the available user types
  const userTypes = ["SUPPLIER", "MANUFACTURER", "SELLER", "PROCESS MANAGER"];

  // Function to update the selected type
  const selectType = (type) => {
    setSelectedType(type);
    // Store the selected type in AsyncStorage
    AsyncStorage.setItem("userType", type);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleLogin = () => {
    if (selectedType === "SUPPLIER") {
      navigation.navigate("SellerMain");
    }
  };
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
        "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
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
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      {!isKeyboardActive && (
        <>
          <Image
            className="h-full w-full absolute"
            source={require("../assets/images/background.png")}
          />

          {/* lights */}
          <View className="flex-row justify-around w-full absolute">
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              source={require("../assets/images/light.png")}
              className="h-[225] w-[90]"
            />
            <Animated.Image
              entering={FadeInUp.delay(400).duration(1000).springify()}
              source={require("../assets/images/light.png")}
              className="h-[160] w-[65] opacity-75"
            />
          </View>
        </>
      )}

      {/* Fixed top bar for user type selection */}
      <View
        className="w-full bg-white flex flex-row justify-between items-center"
        style={{ borderBottomWidth: 1, borderBottomColor: "#1D1D27" }}
      >
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => selectType(type)}
            style={{
              height: 40,
              borderBottomWidth: selectedType === type ? 3 : 1,
              borderBottomColor:
                selectedType === type ? "#1D1D27" : "transparent",
              padding: 5,
            }}
          >
            <Text
              style={{ fontSize: 4, fontWeight: "bold", color: "#1D1D27" }}
            ></Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Montserrat-SemiBold",
                color: "#1D1D27",
              }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className={
              !isKeyboardActive
                ? "text-white font-bold tracking-wider text-5xl"
                : "text-black font-bold tracking-wider text-5xl"
            }
            style={isKeyboardActive && { paddingBottom: 100 }}
          >
            Login
          </Animated.Text>
        </View>

        {/* Form */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              className="w-full p-3 rounded-2xl mb-3 bg-slate-900"
              onPress={() => {
                handleLogin;
              }}
            >
              <Text
                className="text-xl text-white text-center"
                style={{ fontFamily: "Montserrat-ExtraBold" }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Signup")}>
              <Text className="text-sky-600">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
