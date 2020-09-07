import React, { useState } from 'react';
import { SafeAreaView, Text, Alert, AsyncStorage, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    const spot_id = navigation.getParam('id');

    const [ date, setDate ] = useState('');

    async function handleBook(){
        const user_id = await AsyncStorage.getItem('user');

        const response = await api.post(`/spots/${spot_id}/booking`, {
            date
        }, {
            headers: {user_id}
        });

        if( response.status === 200){
            Alert.alert('Reserva enviada');
            navigation.navigate('List');
        } else {
            Alert.alert('Erro');
        }

    }

    function handleCancel(){
        navigation.navigate('List');
    }

    <TextInput
                style={styles.input}
                placeholder="Melhor dia"
                placeholderTextColor="#999"
                autoCorrect={false}
                type="date"
                onChangeText={setDate}
            />

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>
                Escolha uma data *
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Melhor dia"
                placeholderTextColor="#999"
                autoCorrect={false}
                type="date"
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleBook} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        marginHorizontal: 20,
        flex:1,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2,
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 15,
    },
    cancelButton:{
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});