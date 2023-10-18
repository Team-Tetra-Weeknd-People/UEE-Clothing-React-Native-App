import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
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

export default function SignupScreen() {
  const navigation = useNavigation();
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [selectedType, setSelectedType] = useState("SUPPLIER"); // State to store the selected type

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define the available user types
  const userTypes = ["SUPPLIER", "MANUFACTURER", "SELLER", "PROCESS MANAGER"];

  // Function to update the selected type
  const selectType = (type) => {
    setSelectedType(type);
    // Store the selected type in AsyncStorage
    AsyncStorage.setItem("userType", type);
  };

  useEffect(() => {
    setSelectedType("SUPPLIER");
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

  async function signUp() {
    // check all fields are filled
    if (
      firstName === "" ||
      lastName === "" ||
      companyName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // password length check
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const user = {
      fname: firstName,
      lname: lastName,
      companyName: companyName,
      email: email,
      password: password,
    };

    AsyncStorage.getItem("userType").then((type) => {
      console.log(type);

      if (type === "SUPPLIER") {
        // Register Supplier
        SupplierService.createSupplier(user).then((res) => {
          if (res.status === 201) {
            alert("Supplier created successfully");
            navigation.navigate("Login");
          } else {
            alert("Error creating supplier");
          }
        });
      } else if (type === "MANUFACTURER") {
        // Register Manufacturer
        ManufacturerService.createManufacturer(user).then((res) => {
          if (res.status === 201) {
            alert("Manufacturer created successfully");
            navigation.navigate("Login");
          } else {
            alert("Error creating manufacturer");
          }
        });
      } else if (type === "SELLER") {
        // Register Seller
        SellerService.createSeller(user).then((res) => {
          if (res.status === 201) {
            alert("Seller created successfully");
            navigation.navigate("Login");
          } else {
            alert("Error creating seller");
          }
        });
      } else if (type === "PROCESS MANAGER") {
        // Register Process Manager
        ProcessManagerService.createProcessManager(user).then((res) => {
          if (res.status === 201) {
            alert("Process Manager created successfully");
            navigation.navigate("Login");
          } else {
            alert("Error creating process manager");
          }
        });
      }
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      {!isKeyboardActive && (
        <>
          <Image
            style={{ position: "absolute", height: "75%", width: "100%" }}
            source={require("../assets/images/background.png")}
          />

          {/* lights */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              width: "100%",
            }}
          >
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              source={require("../assets/images/light.png")}
              style={{ height: 225, width: 90 }}
            />
            <Animated.Image
              entering={FadeInUp.delay(400).duration(1000).springify()}
              source={require("../assets/images/light.png")}
              style={{ height: 160, width: 65, opacity: 0.75 }}
            />
          </View>
        </>
      )}

      {/* Top bar for user type selection */}
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#1D1D27",
        }}
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
              style={{ fontSize: 12, fontWeight: "bold", color: "#1D1D27" }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-30">
        {/* title */}
        <View className="flex items-center">
          {!isKeyboardActive && (
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="flex items-center"
            >
              <Text className="text-4xl font-bold text-slate-900 text-white">
                Create Account
              </Text>
            </Animated.View>
          )}
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="First Name"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Company Name"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setCompanyName(text);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              className="w-full bg-slate-900 p-3 rounded-2xl mb-3"
              onPress={signUp}
            >
              <Text className="text-xl font-bold text-white text-center">
                SignUp
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
