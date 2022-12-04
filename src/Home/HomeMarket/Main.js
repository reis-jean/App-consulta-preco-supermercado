import React, {useState, useEffect, useReducer} from "react";
import {SafeAreaView, View, Text, TouchableOpacity, FlatList} from "react-native"

import firebase from "../../config/firebase";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import styles from "../../Style/Style";

export default function Task({navigation, route}){
    
    const [task, setTask] = useState([])
    const database = firebase.firestore();
    const [userLog, setUserLog] = useState("");

    function logout(){
        firebase.auth().signOut().then(()=>{
            navigation.navigate("LoginUser")
        }).catch((error)=>{

        });
    }
    
    
    function deleteTask(id){
        console.log(id)
        database.collection(route.params.idUser).doc(id).delete()
    }
    useEffect(() =>{
        console.log("id do user")
        console.log(route.params.idUser);
        database.collection(route.params.idUser).onSnapshot((query)=>{
            const list = [];
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            });
            setTask(list);
        });

        
                
        
    }, []);

    return(
        /*
        <View style={styles.container}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={( {item } ) =>{ 
                    return(
                    <View style={styles.Tasks}>
                        <TouchableOpacity 
                            style={styles.deleteTasks}
                            onPress={() => {
                                deleteTask(item.id)
                            }}
                        >
                        <FontAwesome
                            name="star"
                            size={23}
                            color="#f92e6a"
                        >
                        </FontAwesome>
                        </TouchableOpacity>
                        <Text
                            style={styles.DescriptionTask}
                            onPress={()=>{ navigation.navigate("Details", {
                                id: item.id, 
                                description: item.description,
                                idUser: route.params.idUser 
                                })
                            }}
                            >
                            {item.description}
                        </Text>
                    </View>
                    )
                }}
            />
            <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NewTask", {idUser: route.params.idUser })}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonLogout}
                onPress={() => {logout()}}>
                <Text style={styles.iconButtonlogout}>
                    <MaterialCommunityIcons
                        name="location-exit"
                        size={23}
                        color="#F92E6A"
                    />
                </Text>
            </TouchableOpacity>
        </View>
        */
       <View style={styles.container}>
        <Text>
            Home Market
        </Text>
        <TouchableOpacity 
                style={styles.buttonLogout}
                onPress={() => {logout()}}>
                <Text style={styles.iconButtonlogout}>
                    <MaterialCommunityIcons
                        name="location-exit"
                        size={23}
                        color="#F92E6A"
                    />
                </Text>
                
            </TouchableOpacity>
       </View>
    );
}