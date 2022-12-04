import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal} from "react-native"
import firebase from "firebase";
import * as Location from 'expo-location';
import {FontAwesome} from "@expo/vector-icons";
import styles from "../Style/Style";

export default function ProductsMarket({navigation, route}){
    
    const [idUser, setIdUser] = useState(route.params.id);
    const [name, setName] = useState(route.params.name);
    const [products, SetProducts] = useState([]);
    
    const database = firebase.firestore();

    const [origin, setOrigin] = useState(null);

    const [shopList, setShopList] = useState([]);
    const [itensShopList, setItensShopList] = useState(shopList.length);
    const [modalVisible, setModalVisible] = useState(false);


    function addShopList(item){
        const list = []
        list.push(item)
        let exist = false;
        list.forEach((doc)=>{
            if(shopList.length){                
                for(let i = 0; i < shopList.length; i++){
                    if (doc.id == shopList[i].id){
                        alert("Ooops... Este produto já adicionado.")
                        exist = true;
                    }
                    if(doc.user.id != shopList[i].userId){
                        alert("Ooops... Este produto é de outro mercado! Esvazie a lista de compras caso queria adicionar.")
                        exist = true;
                    }
                }
                if (!exist){
                    shopList.push({id:doc.id, nameProduct:doc.nameProduct, price: doc.price, userId: doc.user.id,nameUser:doc.user.name, address:doc.user.address})
                }
                
            }else{
                shopList.push({id:doc.id, nameProduct:doc.nameProduct, price: doc.price, userId: doc.user.id, nameUser:doc.user.name, address:doc.user.address})
                
            }
        })       
       
        setItensShopList(shopList.length);

    }
    
    function removeShopList(idItem){
        
        for(let i = 0; i < shopList.length; i++){
            if(shopList[i].id == idItem){
                shopList.splice(i, 1);
            }
        }
        setItensShopList(shopList.length)
        if(itensShopList == 1){
            setModalVisible(false);
        }
    }

    useEffect(() =>{
        
        //recupera localização do usuario
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
        
      

        //recupera os produtos        
        database.collection('products').onSnapshot((query)=>{
                const list = [];
                query.forEach((doc)=>{
                    list.push({...doc.data(), id: doc.id})
                });
                SetProducts(list);
        })

    }, []);
    

    const productsFilter = products.filter((product)=> product.user.id.startsWith(idUser));
    
    return(
       <View style={styles.containerA}>
                <View style={styles.barTop}>
                    <Text style={styles.titleMarket}>{name}</Text>
                </View>
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={productsFilter}
                renderItem={( {item } ) =>{ 
                    return(
                    <View style={styles.containerProduct}>
                        <View>
                            <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                            <Text style={styles.price}> {item.price}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.buttonAddList}
                            onPress={() => addShopList(item)}
                        >
                            <Text style={styles.iconButtonB}>
                                <FontAwesome 
                                    name="cart-plus" 
                                    size={23} 
                                    color="#fff"
                                />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )
                }}
                />
                { itensShopList ? 
                    <TouchableOpacity 
                        style={styles.buttonNewProduct}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.iconButton}>
                        <FontAwesome 
                            name="shopping-cart" 
                            size={23} 
                            color="#fff"
                        />
                        {itensShopList}</Text>
                    </TouchableOpacity>
                    : 
                    <View></View>
                }
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.barTop}>
                            <TouchableOpacity
                                style={styles.buttonBack}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text  style={styles.textButtonBack}>
                                    <FontAwesome 
                                        name="chevron-left" 
                                        size={23} 
                                        color="#fff"
                                    />
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.titleMarket}>Lista de compras</Text>
                            
                        </View>
                        <View style={styles.containerA}>
                            <FlatList 
                                style={styles.areaShopList}
                                showsVerticalScrollIndicator={false}
                                data={shopList}
                                renderItem={( {item } ) =>{ 
                                    return(
                                    <View>
                                        <View style={styles.containerProduct}>
                                                <View>
                                                    <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                                                    <Text style={styles.price}>R$ {item.price}</Text>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.buttonAddList}
                                                    onPress={() => removeShopList(item.id)}
                                                >
                                                    <Text style={styles.iconButtonB}>
                                                        <FontAwesome 
                                                            name="trash" 
                                                            size={23} 
                                                            color="#fff"
                                                        />
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                    
                                    )
                                }}
                            />

                                <View style={styles.areaTextsholist}>
                                    <Text style={styles.Textsholist} >Mais produtos deste mercado</Text>
                                </View>

                            <FlatList 
                                style={styles.areaProducts}
                                showsVerticalScrollIndicator={false}
                                data={productsFilter}
                                renderItem={( {item } ) =>{ 
                                    return(
                                    <View>
                                        <View style={styles.containerProduct}>
                                                <View>
                                                    <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                                                    <Text style={styles.price}>R$ {item.price}</Text>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.buttonAddList}
                                                    onPress={() => addShopList(item)}
                                                >
                                                    <Text style={styles.iconButtonB}>
                                                        <FontAwesome 
                                                            name="cart-plus" 
                                                            size={23} 
                                                            color="#fff"
                                                        />
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                    
                                    )
                                }}
                            />  
                            
                        </View>
                    </View>
                </Modal>

            </View>
    );
}