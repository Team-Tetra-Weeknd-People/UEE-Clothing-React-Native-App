import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import ItemQAService from '../../../../services/ItemQA.service';


export default function EditQA({ route }) {
    const { item } = route.params;
    const navigation = useNavigation();

    const [qaName, setQAname] = useState(item.qaName);
    const [qaDescription, setQADescription] = useState(item.qaDescription);


    const handleSubmit = () => {
        //check if the fields are empty
        if (!qaName || !qaDescription) {
            alert('Please enter all the fields');
            return;
        }

        const data = {
            qaName: qaName,
            qaDescription: qaDescription,
            itemID: item.itemID,
        };

        ItemQAService.updateItemQA(item._id, data).then((value) => {
            alert('QA Updated Successfully');
            navigation.navigate('ItemList');
        });
    }

    return (
        <>
            <View>
                <Text style={styles.title}>Edit Quality Attribute</Text>
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