import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialQAService from '../../../../services/MaterialQA.Service';


export default function AddQA({ route }) {
    const { item } = route.params;
    const navigation = useNavigation();
    const [text, setText] = useState('');

    const [QAname, setQAname] = useState('');
    const [QADescription, setQADescription] = useState('');

    const handleSubmit = () => {
        //check if the fields are empty
        if (!QAname || !QADescription) {
            alert('Please enter all the fields');
            return;
        }

        const data = {
            QAName: QAname,
            QADescription: QADescription,
            materialID: item._id,
        };

        MaterialQAService.createMaterialQA(data).then((value) => {
            alert('QA Added Successfully');
            navigation.navigate('ItemList');
        });
    };

    return (
        <>
            <View>
                <Text style={styles.title}>Add Quality Attribute</Text>
                <View style={styles.addForm}>
                    <TextInput
                        placeholder="Enter QA Name"
                        value={QAname}
                        onChangeText={setQAname}
                        style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 10 }}
                    />

                    <TextInput
                        placeholder="Enter QA Description"
                        value={QADescription}
                        onChangeText={setQADescription}
                        style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 10 }}
                    />
                    <Button style={styles.addBtn} title="Submit" onPress={handleSubmit} />

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        letterSpacing: 1.5,
        padding: 16,
    },
    addForm: {
        margin: 10,
    },
    addBtn: {
        marginTop: 10,
    }
});