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

import ManufacturerService, {
  loginManufacturer,
} from "../services/Manufacturer.Service";
import SupplierService from "../services/Supplier.Service";
import SellerService from "../services/Seller.Service";
import ProcessManagerService from "../services/ProcessManager.Service";

import WakeUpService from "../services/WakeUp.Service";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [selectedType, setSelectedType] = useState("SUPPLIER"); // State to store the selected type

  const [email, setEmail] = useState("randula98@gmail.com");
  const [password, setPassword] = useState("11111111");

  // Define the available user types
  const userTypes = ["SUPPLIER", "MANUFACTURER", "SELLER", "PROCESS MANAGER"];

  // Function to update the selected type
  const selectType = (type) => {
    setSelectedType(type);
    // Store the selected type in AsyncStorage
    AsyncStorage.setItem("userType", type);
  };

  useEffect(() => {
    WakeUpService.wakeUp();
  }, []);

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
    // check all fields are filled
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    // check if email is valid
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

    const loginData = {
      email: email,
      password: password,
    };

    switch (selectedType) {
      case "MANUFACTURER":
        ManufacturerService,
          loginManufacturer(loginData)
            .then((res) => {
              if (res.status === 200) {
                alert("Login Successful");
                AsyncStorage.setItem("token", res.data.token);
                AsyncStorage.setItem("user", res.data.user);
                AsyncStorage.setItem("id", res.data.id)
                navigation.navigate("ManufacturerMain");
              } else {
                alert(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
              alert("Please Check Email & Password");
            });
        break;
      case "SUPPLIER":
        SupplierService.loginSupplier(loginData)
          .then((res) => {
            if (res.status === 200) {
              alert("Login Successful");
              AsyncStorage.setItem("token", res.data.token);
              AsyncStorage.setItem("user", res.data.user);
              AsyncStorage.setItem("id", res.data.id)
              navigation.navigate("SupplierMain");
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Please Check Email & Password");
          });
        break;
      case "SELLER":
        SellerService.loginSeller(loginData)
          .then((res) => {
            if (res.status === 200) {
              alert("Login Successful");
              AsyncStorage.setItem("token", res.data.token);
              AsyncStorage.setItem("user", res.data.user);
              AsyncStorage.setItem("seller", JSON.stringify(res.data.result)).then(() => {
                navigation.navigate("SellerMain");
              });
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Please Check Email & Password");
          });
        break;
      case "PROCESS MANAGER":
        ProcessManagerService.loginProcessManager(loginData)
          .then((res) => {
            if (res.status === 200) {
              alert("Login Successful");
              AsyncStorage.setItem("token", res.data.token);
              AsyncStorage.setItem("user", res.data.user);
              AsyncStorage.setItem("id", res.data.id)
              // navigation.navigate("ProcessManagerHome");
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Please Check Email & Password");
          });
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };

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
        className="w-full bg-white flex flex-row justify-evenly items-center"
      >
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => selectType(type)}
            style={{
              height: 40,
              borderBottomWidth: selectedType === type ? 5 : 1,
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
                color: selectedType === type ? "#1D1D27" : "grey",
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
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              onChangeText={(text) => setPassword(text)}
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
                handleLogin();
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
              <Text className="text-sky-600">Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
