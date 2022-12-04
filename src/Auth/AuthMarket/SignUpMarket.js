import React, {useState, useEffect} from "react";
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity , Platform, ListViewBase} from "react-native";
import styles from "../../Style/Style";

import firebase from "../../config/firebase";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config'
export default function SignUpMarket({navigation}){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("market");
    const [errorRegister, setErrorRegister] = useState("");

    const registerMarket = () =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential)=> {
                let user = userCredential.user;
                firebase.firestore().collection('users')
                    .doc(user.uid)
                    .set({
                        name: name,
                        email: user.email,
                        password: password,
                        address: address,
                        userType: userType
                    });
                    console.log(address)
                navigation.navigate("Home")
            })
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            })
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.os === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Cadastro De supermercado parceiro</Text>
            <TextInput 
                style={styles.input}
                placeholder="enter your Name"
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput 
                style={styles.input}
                placeholder="enter your email"
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput 
                style={styles.input}
                placeholder="enter your password"
                secureTextEntry={true}
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <View style={styles.searchAddres}>
                <GooglePlacesAutocomplete
                    placeholder='Localize seu endereço'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data, details);
                        setAddress({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421,
                        })
                    }}
                    query={{
                        key: config.googleApi,
                        language: 'pt-br',
                    }}
                    fetchDetails={true}
                    styles={{ListView:{height: 100}}}
                />
            </View>
            
            {errorRegister === true ? 
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                     name="alert-circle"
                     size={24}
                     color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Invalid e-mail or password</Text>
                </View>
                :
                <View/>
            }

            {email === "" || password === "" ? 
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonLogin}
                >
                    <Text  style={styles.textButtonRegister}>Cadastrar</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={registerMarket}
                >
                    <Text  style={styles.textButtonRegister}>Cadastrar</Text>
                    
                </TouchableOpacity>
            }
            <Text style={styles.login}>
                Já possui cadastro?  
                <Text style={styles.linkLogin}
                    onPress={()=> navigation.navigate("LoginMarket")}
                >
                    Voltar ao Login ...
                </Text>
            </Text>
            <Text style={styles.registration}> 
                <Text style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("LoginUser")}
                >
                    Logar ou se cadastrar como Usario 
                </Text>
            </Text>
            <View style={{height:100}}/>
            
        </KeyboardAvoidingView>
    );
}