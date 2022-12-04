import React, {useState, useEffect, useRef} from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native"
import firebase from "firebase";

import styles from "../Style/Style";

import MapView from "react-native-maps";// npx expo install react-native-maps
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions";
import MapViewDirections from 'react-native-maps-directions';
import config from '../config'



export default function List({navigation, route}){
    const database = firebase.firestore();

    const mapEL = useRef(null);
    const [origin, setOrigin] = useState(null);
    const [idUser, setIdUser] = useState(route.params.id);
    const [name, setName] = useState(route.params.name);
    const [user, setUser] = useState();

    const[destination, setDestination] = useState({
        latitude: -20.55568696955249, 
        longitude: -47.397568924664775,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421
    });
    const [distance, setDistance] = useState(null);

    function getMarkets(){
        database.collection('users').onSnapshot((query)=>{
            const list = [];
            query.forEach((doc)=>{
                if(doc.id == idUser){
                    list.push({...doc.data(), id: doc.id})
                }
            })
            setUser(list)
        })
        console.log("user:2", user)
    }

    useEffect(()=>{
       
        getMarkets();
        //localização do usuario
        (async function(){
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000922,
                    altitude: location.coords.altitude
                }
                );
            } else {
                throw new Error('Location permission not granted');
            }
        })();

    }, []);

    
    
    return(
        <View style={styles.containerA}>
            <Text>{name}</Text>
            <MapView 
                style={styles.map}
                initialRegion={origin}
                showsUserLocation={true}
                zoomEnabled={false}
                loadingEnabled={true}
                ref={mapEL}
            >
                {destination &&
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={config.googleApi}
                        strokeWidth={3}
                        onReady={result=>{
                            setDistance(result.distance)
                            mapEL.current.fitToCoordinates(
                                result.coordinates,{
                                    edgePadding:{ //apenas para o traçado do mapa não ficar proximo da borda
                                    top: 50,
                                    bottom: 50, 
                                    left: 50, 
                                    right: 50,
                                    }
                                }
                                )
                        }}
                    />
                
                }
            </MapView>
            <View>
                <Text>Distancia: {distance} m</Text>
            </View>
        </View>
    );
}