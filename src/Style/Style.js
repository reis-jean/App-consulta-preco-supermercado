import { Modal, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 0:50,

    },
    barTop:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: -50,
        padding: 15,
        paddingTop: 55,
        paddingBottom: 15,
        backgroundColor: "#55A388"
    },
    textUser:{
        color: "#fff",
        fontSize: 20
    },
    buttonLoginHome:{
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
        borderColor: "#FFF"
    },
    buttonNewProduct:{
        width: 60,
        height: 60,
        position: "absolute", 
        bottom: 30, 
        left: 20,
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonListProduct:{
        width: 60,
        height: 60,
        position: "absolute", 
        bottom: 30, 
        right: 20,
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
   
    containerA:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios" ? 0:50,

    },
    barCodeArea:{
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#55A388",
        marginTop: 10,
    },
    inputBarCode:{
        width: "60%",
        marginTop: 10, 
        padding: 10,
        height: 50, 
        marginLeft: "auto", 
        marginRight: "auto", 
        color: "#4d5156",
    },
    buttonBarCode:{
        width: 50,
        height: 40, 
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textLogin:{
        color: "#fff",
        fontSize: 20
    },
    title:{
        fontSize: 48, 
        color: "#55A388",
        marginBottom: 10,
        fontWeight: "bold",
    },
    input:{
        width: 300,
        marginTop: 10, 
        padding: 10,
        height: 50, 
        borderBottomWidth: 1,
        borderBottomColor: "#55A388", 
        marginLeft: "auto", 
        marginRight: "auto", 
        color: "#4d5156",
    },
    buttonLogin:{
        width: 200,
        height: 50, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#55A388",
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonLogin:{
        color: "#FFF"
    },
    searchAddres:{
        width: "90%", 
        height: 200,
        margin: 10, 
        borderWidth: 1
    },
    contentAlert:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    WarningAlert:{
        padding: 10,
        color: "#bdbdbd",
        fontSize: 16
    },
    registration:{
        marginTop: 20,
        color: "#4d5156"
    },
    linkSubscribe:{
        color: "#1877f2",
        fontSize: 16
    },
    areaSearch:{
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center"

    },
    areaSearchB:{
        marginTop: 20, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center"

    },
    inputB:{
        width: "75%",
        padding: 10,
        height: 50, 
        borderBottomWidth: 1,
        borderBottomColor: "#55A388",
        color: "#4d5156",
        marginRight: 15
    },
    buttonDeleteSearch:{
        width: 30,
        height: 30,
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    inputC:{
        width: "40%",
        padding: 10,
        height: 50, 
        borderBottomWidth: 1,
        borderBottomColor: "#55A388",
        marginEnd: 8,
        color: "#4d5156",
    },
    areaMarket:{
        flexDirection: "row",
        
    },
    buttonMarket:{
        width: 350,
        height: 130, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#55A388",
        borderRadius: 50,
        marginTop: 20,
    },
    titleHome:{
        fontSize: 25, 
        color: "#55A388",
        marginTop: 10, 
        marginBottom: -10,
        textAlign: "center",
    },
    titleMarket:{
        fontSize: 25, 
        color: "#fff",
    },
    textMarket:{
        fontSize: 15, 
        color: "#FFF", 
        alignSelf: "flex-end",
    },
    marketName:{
        fontSize: 25, 
        color: "#55A388"
    },
    containerProduct:{
        width: 290,
        height: 100,
        marginTop: 20,
        padding: 10, 
        borderWidth: 2,
        borderColor: "#55A388", 
        borderRadius: 20, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around", 
        marginLeft: "auto", 
        marginRight: "auto"
    },
    nameProduct:{
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#55A388"
    },
    price:{
        fontSize: 15
    },
    buttonAddList:{
        width: 50,
        height: 50,
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    alterButtons:{
        flexDirection: "column", 
    },
    buttonAlter:{
        width: 30,
        height: 30,
        backgroundColor: "#55A388",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center", 
        margin: 8
    },
    map:{
        width: "80%",
        height: "80%"
    },
    modal:{
        width: "100%",
        height: 800,
        backgroundColor: "#FFF"
    },
    areaShopList:{
        borderWidth: 2,
        borderColor: "#55A388", 
        borderRadius: 20, 
        paddingBottom: 100,
        paddingHorizontal: 20, 
        
    },
    areaProducts:{
        borderWidth: 2,
        borderColor: "#55A388", 
        borderRadius: 20, 
        paddingBottom: 20,
        paddingHorizontal: 20,
    }, 
    areaTextsholist:{
        padding: 30,
    }, 
    Textsholist:{
        fontSize: 18,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#55A388",
    }

});
export default styles