import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GreenButton from '../../../../components/GreenButton';


import MaterialService from '../../../../services/Material.Service';
import MaterialQAService from '../../../../services/MaterialQA.Service';

export default function ViewItem({ route }) {
    const { item } = route.params;
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('');
    const [materialQAs, setMaterialQAs] = useState([]);

    useEffect(() => {
        try {
            AsyncStorage.getItem('id').then((value) => {
                MaterialQAService.getMaterialQAByID(item._id)
                    .then((value) => {
                        setMaterialQAs(value.data || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching materialQAs:', error);
                    });
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    // Filter orders based on the search text
    const filteredQA = materialQAs.filter((materialQA) =>
        materialQA.QAName.toLowerCase().includes(searchText.toLowerCase())
    );

    async function deleteMaterialQA(id) {
        try {
            await MaterialQAService.deleteMaterialQA(id).then((value) => {
                alert('QA Deleted Successfully');
                navigation.navigate('ItemList');
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{item.name}</Text>

                {/* profile brief */}
                <View style={styles.profileBriefContainer}>
                    <View style={styles.innnerContainer}>
                        <View>
                            <Text style={styles.profileMainText}>{item.description}</Text>
                            <Text style={styles.profileMainText}>$ {item.price}</Text>
                        </View>
                        <GreenButton style={styles.viewOrdersButton} title="Add QA" onPress={() => { navigation.navigate('AddQA', { item: item }) }} />
                    </View>

                </View>
                <View style={styles.levelAndRatingContainer}>
                    <Text style={styles.title}>Quality Attributes</Text>
                    <View style={styles.searchBarContainer}>
                        <FontAwesome5 name="search" size={18} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search Quality Attributes"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                        />
                    </View>

                    <FlatList
                        data={filteredQA}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.tableRow} onPress={() => {
                                // navigation.navigate('ViewItem', { item: item });
                            }}>
                                <Text style={styles.statusCell}>{item.QAName}</Text>
                                <Text style={styles.valueCell}>{item.QADescription}</Text>
                                <TouchableOpacity
                                    style={styles.valueCell}
                                    onPress={() => { navigation.navigate('EditQA', { item: item }) }}
                                >
                                    <Entypo style={styles.valueCell} name="edit" size={24} color="green" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.valueCell}
                                    onPress={() => {
                                        deleteMaterialQA(item._id);
                                    }}>
                                    <AntDesign name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
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
    },
    sectionTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },
    titleUnderline: {
        borderBottomWidth: 3,
        borderBottomColor: '#1D1D27',
        width: 'auto',
        alignSelf: 'flex-end',
    },
    viewOrdersButton: {
        marginTop: 10,
        width: 'auto',
        alignSelf: 'center',
        shadowColor: '#1D1D27',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileBriefContainer: {
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 100,
    },
    levelAndRatingContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingTop: 5,
        marginVertical: 10,
        shadowColor: '#14D2B8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 180,
    },

    innnerContainer: {
        flex: 1, // This makes it a flex container, taking the full width of the screen
        flexDirection: 'row', // Arranges the columns horizontally
        marginTop: 10,
    },
    column: {
        flex: 1, // Each column takes an equal amount of available space
    },
    profileMainText: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
    },

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#EDEEEF',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#EDEEEF',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        paddingLeft: 5,
        paddingRight: 7,
    },
    searchBar: {
        flex: 1,
        height: 40,
        fontSize: 16,
        fontFamily: 'Aldrich-Regular',
        color: '#1D1D27',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 20,
    },
    manufacturerCell: {
        flex: 1, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    supplierCell: {
        flex: 3, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    valueCell: {
        flex: 1, // Adjusted flex value
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    statusCell: {
        flex: 2, // Adjusted flex value
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    viewOrdersButton: {
        marginLeft: 40,
        height: 40,
        width: 100,
    }
});