import React,  { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect( () => {

        AsyncStorage.getItem('user').then( user => {
            if(user){
                navigation.navigate('List');
            }
        });

    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        });

        const { id } = response.data[0];

        if(id){
            await AsyncStorage.setItem( 'user', id.toString());
            await AsyncStorage.setItem( 'techs', techs.toString());
    
            navigation.navigate('List');
        }
        
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.h1}>AirFJB</Text>
            <View style={styles.form}>
                <Text style={styles.label}>
                    Seu e-mail *
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="usuario@dominio.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>
                    Tecnologias *
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Separe por vírgulas"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:{
        fontSize: 30,
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
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
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

