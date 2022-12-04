import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, TextInput, FlatList, Modal, ScrollView} from "react-native";
import haversine from "haversine";

import firebase from "firebase";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

import styles from "../Style/Style";
import Markets from "./Markets";

import * as Location from 'expo-location';

export default function Home({navigation, route}){
    
    //const [task, setTask] = useState([])
    const database = firebase.firestore();
    
    const [marketLog, setMarketLog] = useState(false);//boleano de verificacao de login do usuario
    const [products, SetProducts] = useState([]);//lista de produtos
    const [markets, setMarkets] = useState([]);//lista de mercados
    const [idUser, setIdUser] = useState();//id do usuario/mercado

    const [origin, setOrigin] = useState(null);//localizaçao do usuario
    
    const [pesquisar, setPesquisar] = useState('');// parametro para filtro da pesquisa
    const [shopList, setShopList] = useState([]);//lista de compras
    const [itensShopList, setItensShopList] = useState(shopList.length);//quantidade de itens na lista
    
    const [modalVisible, setModalVisible] = useState(false);//boleando do modal de lista de compras

    //fazer logout
    function logout(){
        firebase.auth().signOut().then(()=>{
            navigation.navigate("Home")
            setMarketLog(false)
        }).catch((error)=>{});
    }

    //recuperar lista de mercados 
    function getMarkets(){
        database.collection('users').onSnapshot((query)=>{
            const list = [];
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            })
            setMarkets(list)
        })
    }

    //deletar produtos
    function deleteProduct(id){
        database.collection("products").doc(id).delete();
        alert("Produto excluido com sucesso")
    }


    //adicionar produtos a lista de compras
    function addShopList(item){
        const list = []
        list.push(item)
        let exist = false;
        list.forEach((doc)=>{
            //verificar se o produto ja esta esta na lista de compras ou se é de outro mercado
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
                    setIdUser(doc.user.id)
                }
            }else{
                shopList.push({id:doc.id, nameProduct:doc.nameProduct, price: doc.price, userId: doc.user.id, nameUser:doc.user.name, address:doc.user.address})
                setIdUser(doc.user.id)
            }
        }); 
        setItensShopList(shopList.length)
    }
    
    //remover produto da lista de compras
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
                    altitude: location.coords.altitude
                });
               
            } else {
                throw new Error('Location permission not granted');
            }
        })();

        //verifica se o usuario esta logado
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                setIdUser(user.uid) 
                setMarketLog(true)                
            }
        });

        //recupera dados do produtos e adicona na lista de produtos        
        database.collection('products').onSnapshot((query)=>{
            const list = [];
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            })
            SetProducts(list)
        });
        
        //chama a function getMarkets
        getMarkets();
    }, []);

    //renderizar os mercados
    function renderMarkets(){
        const jsx = [];
        markets.forEach((doc)=>{
            jsx.push(
                <TouchableOpacity style={styles.buttonMarket} onPress={()=> navigation.navigate("ProductsMarket", {id:doc.id, name:doc.name, address: doc.address})} >
                    <Markets id={doc.id} name={doc.name} address={doc.address} origin={origin} navigation={navigation} distance={haversine(origin, doc.address)} />
                </TouchableOpacity>
            )
        });

        //ordenar os mercados por distancia
        const sorted = jsx.sort((a, b)=>{
            return a.props.children.props.distance - b.props.children.props.distance;
        });
        return sorted;
    }

    //ordenar produtos por menor preco
    function ordernarlist(list){
        const listOrder = list.sort((a, b)=>{
            return a.price - b.price
        })
        return listOrder;
    }
    //fazer o filtro de produtos conforme for inserido a pesquisa
    const pesquisarLower = pesquisar.toLowerCase();
    const productsFilter = products.filter((product)=> product.nameGeneric.toLowerCase().startsWith(pesquisarLower));
    const productsFilterMarket = products.filter((product)=> product.user.id.startsWith(idUser));
    
    

    return(
       <View style={styles.container}>
         {/* bar code (Caso  houver mercado logado intitular "Olá parceiro"; se não intitular "Olá usuário"*/}
                    { marketLog === true ?
                    <View style={styles.barTop}>
                        <Text style={styles.textUser}>
                            Olá parceiro
                        </Text>
                        <TouchableOpacity 
                                style={styles.buttonLogout}
                                onPress={() => {logout()}}>
                                <Text style={styles.iconButtonlogout}>
                                    <MaterialCommunityIcons
                                        name="location-exit"
                                        size={30}
                                        color="#fff"
                                    />
                                </Text>
                                
                        </TouchableOpacity>
                    </View>
                        :
                    <View style={styles.barTop}>
                        <Text style={styles.textUser}>
                            Olá usuário
                        </Text>
                        <TouchableOpacity 
                            style={styles.buttonLoginHome}
                            onPress={()=> navigation.navigate("LoginUser")}>
                                <Text style={styles.textLogin}>
                                    Login
                                </Text>
                        </TouchableOpacity>
                    </View>
                    }
            {/* botão de adicionar produto (Caso  houver mercado logado disponibilizar o botão de adicionar produto) */}
            {marketLog === true ?
                <TouchableOpacity 
                    style={styles.buttonNewProduct}
                    onPress={() => navigation.navigate("AddProduct")}>
                    <Text style={styles.iconButton}>+</Text>
                </TouchableOpacity>
                :
                <View></View>
            }
            {/* lista propria dos produtos (listar produtos do mercado caso o mercado esteja logado: Se não listar mercados proximo e barra de pesquisa) */}
            {/* feed de consulta */}
            {marketLog === true ?
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={productsFilterMarket}
                    renderItem={( {item } ) =>{ 
                        return(
                        <View style={styles.containerProduct}>
                            <View>
                            <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                            <Text style={styles.price}>R$ {item.price}</Text>
                            <Text style={styles.price}>Tipo: {item.nameGeneric}</Text>
                            </View>
                            <View  style={styles.alterButtons} >
                                <TouchableOpacity 
                                    style={styles.buttonAlter}
                                    onPress={ () => { deleteProduct(item.id)}}
                                >
                                    <Text style={styles.iconButtonB}>
                                        <FontAwesome 
                                            name="trash" 
                                            size={20} 
                                            color="#fff"
                                        />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.buttonAlter}
                                onPress={()=>{ navigation.navigate("Details", {
                                            id: item.id, 
                                            nameProduct: item.nameProduct,
                                            nameGeneric: item.nameGeneric,
                                            price: item.price,
                                            barCode: item.barCode,
                                            idUser: item.user.id

                                            })
                                        }}
                                >
                                    <Text style={styles.iconButtonB}>
                                        <FontAwesome 
                                            name="pencil-square-o" 
                                            size={20} 
                                            color="#fff"
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    }}
                />
               
                :
                <View style={styles.main}>
                <View style={styles.areaSearch}>
                    <TextInput
                        style={styles.inputB}
                        placeholder="Procurar produtos"
                        type="text"//  type="number" -> abre o teclado numero
                        onChangeText={(text) => setPesquisar(text)}
                        value={pesquisar}
                    />
                    { pesquisar ? 
                        <TouchableOpacity 
                            style={styles.buttonDeleteSearch}
                            onPress={() => {setPesquisar("")}}
                        >
                            <Text style={styles.iconButtonB}>
                                <FontAwesome 
                                    name="close" 
                                    size={23} 
                                    color="#fff"
                                />
                            </Text>
                        </TouchableOpacity>
                    :
                    <View></View>   
                    }
                    
                </View>
                 {/* lista resultado da pesquisa */}
                <View styles={styles.feedArea}>
                        {pesquisar ? 
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                data={ordernarlist(productsFilter)}
                                renderItem={( {item } ) =>{ 
                                    return(
                                    <View style={styles.containerProduct}>
                                        <View>
                                            <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                                            <Text style={styles.price}>R$ {item.price}</Text>
                                            <Text  style={styles.price}>{item.user.name}</Text>
                                            <Text  style={styles.price}>{haversine(origin, item.user.address).toFixed(2)} Km</Text>
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
                            : 
                            <View styles={styles.areaMarket}>
                                <Text style={styles.titleHome}>
                                    Mercados proximos 
                                </Text>
                                <ScrollView>
                                        {renderMarkets()}
                                </ScrollView>
                                    
                                
                            </View>
                            }
                    </View>
                </View>
            }
            { itensShopList && marketLog === false ? 
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
            {/* Lista de compras */}
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
                        
                                <FlatList style={styles.areaShopList}
                                    showsVerticalScrollIndicator={false}
                                    data={shopList}
                                    renderItem={( {item } ) =>{ 
                                        return(
                                            <ScrollView>
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
                                            </ScrollView>
                                    
                                        )
                                    }}
                                />

                                <View style={styles.areaTextsholist}>
                                    <Text style={styles.Textsholist} >Mais produtos deste mercado</Text>
                                </View>

                            <FlatList 
                                style={styles.areaProducts}
                                showsVerticalScrollIndicator={false}
                                data={productsFilterMarket}
                                renderItem={( {item } ) =>{ 
                                    return(
                                    <ScrollView>
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
                                    </ScrollView>
                                    
                                    )
                                }}
                            /> 
                        </View>
                    </View>
                    
            </Modal>
        </View>
    );
}