import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GreenButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#14D2B8',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1D1D27',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
});

export default GreenButton;
