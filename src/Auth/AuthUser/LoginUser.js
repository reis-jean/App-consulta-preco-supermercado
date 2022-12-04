import React, {useState, useEffect}from "react";
import {View, Text, TextInput, TouchableOpacity,Platform, KeyboardAvoidingView} from "react-native";
import styles from "../../Style/Style";

import firebase from "../../config/firebase";

import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function LoginUser({navigation }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const database = firebase.firestore();
    const [userLog, setUserLog] = useState("");

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) =>{
            var user = userCredential.user;
            navigation.navigate("Home", {idUser: user.uid})
        })
        .catch((error) => {
            setErrorLogin(true)
            var errorCode = error.code;
            var errorMessage = error.message
        });
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                navigation.navigate("Home", {idUser: user.uid});
                
            }
        });
    },[]);

    return(
        <KeyboardAvoidingView 
            behavior={Platform.os === "ios" ? "padding" : "height"}
            style={styles.containerA}
        >
            <Text style={styles.title}>Bem Vindo Parceiro</Text>
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
            {errorLogin === true ? 
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
                    <Text  style={styles.textButtonLogin}>Login</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase}
                >
                    <Text  style={styles.textButtonLogin}>Login</Text>
                    
                </TouchableOpacity>
            }

            <Text style={styles.registration}> 
                <Text style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("SignUpMarket")}
                >
                    cadastrar como Supermercado Parceiro
                </Text>
            </Text>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}