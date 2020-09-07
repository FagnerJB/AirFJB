import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SpotList({ tech, navigation }){
    
    const [spots, setSpots] = useState([]);

    useEffect(() => {

        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            });

            if(response.status == 200){
               setSpots(response.data);
            }

        }

        loadSpots();

    }, []);

    function handleBook(id){
        navigation.navigate('Book', { id });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lugares marcados com <Text style={styles.strong}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{uri:item.img_src}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'Gratuito' }</Text>
                        <TouchableOpacity onPress={() => handleBook(item.id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

export default withNavigation(SpotList);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    strong:{
        fontWeight: 'bold'
    },
    list:{
        paddingHorizontal:20,
    },
    listItem:{
        marginHorizontal:7,
    },
    thumbnail:{
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop:10
    },

    price:{
        fontSize:15,
        color: '#999',
        marginTop: 5,
    },
    button:{
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    }
    

});