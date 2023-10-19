import { AsyncStorage } from 'react-native';

// To store data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully.');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// To retrieve data
export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
    } else {
      console.log('No data found for the key:', key);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

// To remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully.');
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

export default {
    storeData,
    retrieveData,
    removeData
  };