import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator,TouchableOpacity, Image, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

export default function SignupScreen() {
    const navigation = useNavigation();
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const [selectedType, setSelectedType] = useState('SUPPLIER'); // State to store the selected type

    // Define the available user types
    const userTypes = ['SUPPLIER', 'MANUFACTURER', 'SELLER', 'PROCESS MANAGER'];

    // Function to update the selected type
    const selectType = (type) => {
        setSelectedType(type);
        // Store the selected type in AsyncStorage
        AsyncStorage.setItem('userType', type);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardActive(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardActive(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const styles = StyleSheet.create({
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white', // Change the background color as needed
        },
      });
    useEffect(() => {
      async function loadFont() {
        await Font.loadAsync({
            'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
            'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            {!isKeyboardActive && (
                <>
                    <Image style={{ position: 'absolute', height: '100%', width: '100%' }} source={require('../assets/images/background.png')} />

                    {/* lights */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', width: '100%' }}>
                        <Animated.Image
                            entering={FadeInUp.delay(200).duration(1000).springify()}
                            source={require('../assets/images/light.png')}
                            style={{ height: 225, width: 90 }}
                        />
                        <Animated.Image
                            entering={FadeInUp.delay(400).duration(1000).springify()}
                            source={require('../assets/images/light.png')}
                            style={{ height: 160, width: 65, opacity: 0.75 }}
                        />
                    </View>
                </>
            )}

            {/* Top bar for user type selection */}
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1D1D27' }}>
                {userTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => selectType(type)}
                        style={{
                            height: 40,
                            borderBottomWidth: selectedType === type ? 3 : 1,
                            borderBottomColor: selectedType === type ? '#1D1D27' : 'transparent',
                            padding: 5,
                        }}
                    >
                        <Text style={{ fontSize: 4, fontWeight: 'bold', color: '#1D1D27' }}></Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1D1D27' }}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-48">

                {/* title */}
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-white font-bold tracking-wider text-5xl"
                        style={isKeyboardActive && { color: '#1D1D27', marginBottom: 120 }}>
                        Sign Up
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity className="w-full bg-slate-900 p-3 rounded-2xl mb-3">
                            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(800).duration(1000).springify()}
                        className="flex-row justify-center">

                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text className="text-sky-600">Login</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            </View>
        </View>
    );
}
