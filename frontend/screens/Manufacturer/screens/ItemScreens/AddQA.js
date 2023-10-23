import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import ItemQAService from '../../../../services/ItemQA.service';

export default function AddQA({ route }) {
    const { item } = route.params;
    const navigation = useNavigation();

    const [qaName, setQAname] = useState('');
    const [qaDescription, setQADescription] = useState('');

    const handleSubmit = () => {
        //check if the fields are empty
        if (!qaName || !qaDescription) {
            alert('Please enter all the fields');
            return;
        }

        const data = {
            qaName: qaName,
            qaDescription: qaDescription,
            itemID: item._id,
        };

        ItemQAService.createItemQA(data).then((value) => {
            alert('QA Added Successfully');
            navigation.navigate('ItemList');
        });
    }

    return (
        <>
            <View>
                <Text style={styles.title}>Add Quality Attribute</Text>
                <View style={styles.addForm}>
                    <TextInput
                        placeholder="Enter QA Name"
                        value={qaName}
                        onChangeText={setQAname}
                        style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 10 }}
                    />

                    <TextInput
                        placeholder="Enter QA Description"
                        value={qaDescription}
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