import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BigSlateButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1D1D27',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
});

export default BigSlateButton;
