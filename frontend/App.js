import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

async function loadFonts() {
  await Font.loadAsync({
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
  });
}

function App() {
  loadFonts(); // Make sure to call the function to load fonts

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: true,
          headerTitle: 'Material Inspector',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            color: 'white',
            fontFamily: 'Montserrat-Regular', // Use the fontFamily name
          },
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

export default App;
