import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
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
        initialRouteName='Login'
        screenOptions={{
          headerShown: true,
          headerTitle: () => (
            <Text style={{
              fontSize: 24,
              color: 'white',
              fontFamily: 'Montserrat-Regular',
            }}>
              Material Inspector
            </Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1D1D27',
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change the background color as needed
  },
});

export default App;
