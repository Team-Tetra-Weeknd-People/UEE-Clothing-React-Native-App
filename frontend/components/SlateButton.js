import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SlateButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1D1D27',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
  },
});

export default SlateButton;
