import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput, Modal} from "react-native"
import firebase from "firebase";
import Scanner from "./Scanner";

import styles from "../../Style/Style";
import { MaterialCommunityIcons} from "@expo/vector-icons";

export default function AddProduct({navigation}){

    const database = firebase.firestore();
    const auth = firebase.auth();

    const [user, setUser] = useState("");

    const [nameProduct, setNameProduct] = useState("");
    const [nameGeneric, setNameGeneric] = useState("");
    const [price, setPrice] = useState("");
    const [barCode, setBarCode] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    
    const onCodeScanned = (type, data) => {
        setBarCode(data);
        setModalVisible(false);
      };

    useEffect(() =>{
        
        const uid = auth.currentUser.uid;
        database.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
            setUser(doc.data());
        })
       
    }, []);

    function addProduct(){
        database.collection("products").add({
            nameProduct: nameProduct,
            nameGeneric: nameGeneric,
            price: price,
            barCode: barCode,
            create_at: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                id: auth.currentUser.uid, 
                name: user.name, 
                address: user.address

            }
        })

        navigation.navigate("Home")
    }
    
    return(
       <View style={styles.containerA}>
            
            <TextInput 
                style={styles.input}
                placeholder="Nome do produto"
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setNameProduct(text)}
                value={nameProduct}
            />
            <TextInput 
                style={styles.input}
                placeholder="Nome generico. (Ex.: Arroz, biscoito...)"
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setNameGeneric(text)}
                value={nameGeneric}
            />
            <TextInput 
                style={styles.input}
                placeholder="preco do produto"
                type="number"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setPrice(text)}
                value={price}
            />
            <View style={styles.barCodeArea}>
                <TextInput 
                    style={styles.inputBarCode}
                    placeholder="Codigo de Barra"
                    type="number"//  type="number" -> abre o teclado numero
                    onChangeText={(text) => setBarCode(text)}
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
            
            <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={addProduct}
                >
                    <Text  style={styles.textButtonLogin}>Adicionar produto</Text>
            </TouchableOpacity>
        </View>
    );
}