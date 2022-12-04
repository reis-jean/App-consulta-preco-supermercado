import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native"
import firebase from "firebase";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location';
import config from "../config/"

import styles from "../Style/Style";

export default function List({navigation, route}){
    
    const [products, SetProducts] = useState([]);
    const [idUser, setIdUser] = useState();
    const database = firebase.firestore();
    
    const [pesquisar, setPesquisar] = useState('');

    const [origin, setOrigin] = useState(null);
    const [distance, setDistance] = useState(null);

    const [shopList, setShopList] = useState([]);

    function renderLista() {
        const list = [];
        route.params.list.forEach((doc)=>{
            list.push({id:doc.id, nameProduct:doc.nameProduct, price: doc.price})
        })
        setShopList(list)
    }

    useEffect(() =>{

        database.collection('products').onSnapshot((query)=>{
                const list = [];
                query.forEach((doc)=>{
                    list.push({...doc.data(), id: doc.id})
                });
                SetProducts(list);
        })

        renderLista();

    }, []);

    //const productsFilter = products.filter((product)=> product.user.id.startsWith(idUser));
    
    
    return(
       <View style={styles.containerA}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={shopList}
                renderItem={( {item } ) =>{ 
                    return(
                    <View>
                        <Text>
                            {item.id}
                            {item.nameProduct}
                        </Text>
                    </View>
                    )
                }}
            />   
        </View>
    );
}