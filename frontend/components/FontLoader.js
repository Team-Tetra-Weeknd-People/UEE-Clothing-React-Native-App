import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const FontLoader =() => {
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
            'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
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
}


export default FontLoader;