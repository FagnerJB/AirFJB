import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, Text, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

export default function List(){
    const [techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.2.10:3333',{
                query: { user_id }
            });
        
            socket.on('booking_request', booking =>{
                console.log(booking);
                Alert.alert(`Sua solicitação foi ${(booking==1) ? 'aceita' : 'rejeitada'}`);
            });

        });

    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storeTechs => {
            const techsArray = storeTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        });
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}>AirFJB</Text>
            <ScrollView>
                {techs.map((tech, index) => (
                    <SpotList key={index} tech={tech} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        flex: 1,
    },
    h1:{
        fontSize: 30,
        alignSelf: "center"
    }
});
