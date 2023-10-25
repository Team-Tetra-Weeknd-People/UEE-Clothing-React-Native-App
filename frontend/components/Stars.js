import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';

const Stars = () => {
    const [rating, setRating] = useState(0);

    const handleChange = useCallback(
        (value) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );

    return (
        <View style={styles.root}>
            <Text style={styles.textL}>ASSURANCE COMPLETED!</Text>
            <Text style={styles.text}>RATE ORDER</Text>
            <Rating size={40} rating={rating} onChange={handleChange} />
            <Text style={styles.text}>Rated {rating} out of 5</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
  },
  textL : {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    letterSpacing: 1.5,
    color: 'darkgoldenrod',
  },
});

export default Stars;