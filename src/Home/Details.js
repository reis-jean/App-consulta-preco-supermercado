import React, { useState, useEffect} from "react";
import {View, Text,TextInput, TouchableOpacity, Modal} from "react-native";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";


import Scanner from "./AddProduct/Scanner";
import styles from "../Style/Style";

import firebase from "firebase";

export default function Details({navigation, route}){
    
    const database = firebase.firestore();
   
    const [id, setIdProduct] = useState(route.params.id);
    const [nameProduct, setNameProduct] = useState(route.params.nameProduct);
    const [nameGeneric, setNameGeneric] = useState(route.params.nameGeneric);
    const [price, setPrice] = useState(route.params.price);
    const [barCode, setBarCode] = useState(route.params.barCode);
    const [idUser, setIdUser] = useState(route.params.idUser);

    
    const [modalVisible, setModalVisible] = useState(false);
    
    const onCodeScanned = (type, data) => {
        setBarCode(data);
        setModalVisible(false);
      };
    
    function editProduct(nameProduct, nameGeneric, price, barCode, id){
        database.collection("products").doc(id).update({
            nameProduct: nameProduct,
            nameGeneric: nameGeneric,
            price: price,
            barCode: barCode,
           
        })
        
        navigation.navigate("Home")
    }
    
   
    console.log(nameProduct);
    
    return(
        <View style={styles.containerA}>
            <Text style={styles.title}>Alterar Produto</Text>
            
            <TextInput 
                style={styles.input}
                placeholder="Nome do produto"
                onChangeText={setNameProduct}
                value={nameProduct}
            />
            <TextInput 
                 style={styles.input}
                placeholder="Nome generico"
                onChangeText={setNameGeneric}
                value={nameGeneric}
            />
            <TextInput 
                 style={styles.input}
                placeholder="Preço"
                onChangeText={setPrice}
                value={price}
            />

            <View style={styles.barCodeArea}>
                <TextInput 
                    style={styles.inputBarCode}
                    placeholder="Codigo de Barra"
                    type="number"
                    onChangeText={setBarCode}
                    value={barCode}
                />
                 <TouchableOpacity
                    style={styles.buttonBarCode}
                    onPress={() => setModalVisible(true)}
                    >
                        <Text  style={styles.iconButton}>
                            <MaterialCommunityIcons
                                name="barcode-scan" 
                                size={24} 
                                color="#FFF" />
                        </Text>
                    
                </TouchableOpacity>
                
            </View>
            
            <TouchableOpacity 
            style={styles.buttonLogin}
                onPress={()=> {editProduct(nameProduct, nameGeneric, price, barCode, id )}}
            >
                <Text style={styles.textButtonLogin}>Alterar</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                <Scanner onCodeScanned={onCodeScanned} />
                <TouchableOpacity title="Cancelar" onPress={() => setModalVisible(false)} />
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => setModalVisible(false)}
                >
                    <Text  style={styles.textButtonLogin}>Cancelar</Text>
                    
            </TouchableOpacity>
                </View>
            </Modal>
            
        </View>
    )
}