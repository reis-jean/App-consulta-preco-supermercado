import React, {useState, useEffect} from "react";
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity , Platform} from "react-native";

import styles from "../../Style/Style";

import firebase from "../../config/firebase";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function SignUpUser({navigation}){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [errorRegister, setErrorRegister] = useState("");

    const registerUser = () =>{

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential)=> {
                let user = userCredential.user;
                firebase.firestore().collection('users')
                    .doc(user.uid)
                    .set({
                        name: name,
                        email: user.email,
                        password: password,
                        userType: userType
                    });
                navigation.navigate("Home", {idUser: user.uid})
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
            <Text style={styles.title}>Cadastro do Usario</Text>
            <TextInput 
                style={styles.input}
                placeholder="digite seu nome"
                type="text"//  type="number" -> abre o teclado numero
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput 
                style={styles.input}
                placeholder="digite seu email"
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
                    style={styles.buttonRegister}
                >
                    <Text  style={styles.textButtonRegister}>Cadastrar</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={registerUser}
                >
                    <Text  style={styles.textButtonRegister}>Cadastrar</Text>
                    
                </TouchableOpacity>
            }
            <Text style={styles.login}>
                Já possui cadastro?  
                <Text style={styles.linkLogin}
                    onPress={()=> navigation.navigate("LoginUser")}
                >
                    Voltar ao Login ...
                </Text>
            </Text>
            <Text style={styles.registration}> 
                <Text style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("LoginMarket")}
                >
                    Logar ou se cadastrar como Supermercado Parceiro
                </Text>
            </Text>
            <View style={{height:100}}/>
            
        </KeyboardAvoidingView>
    );
}