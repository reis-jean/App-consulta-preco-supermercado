import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Auth
import LoginUser from './src/Auth/AuthUser/LoginUser';
import SignUpUser from './src/Auth/AuthUser/SignupUser';
import LoginMarket from './src/Auth/AuthMarket/LoginMarket';
import SignUpMarket from './src/Auth/AuthMarket/SignUpMarket';
//Home
import Home from './src/Home/Home'
import List from "./src/Home/List";
import AddProduct from "./src/Home/AddProduct/AddProduct";
import ProductsMarket from "./src/Home/ProductsMarket";
import Markets from "./src/Home/Markets";
import Details from "./src/Home/Details";

//mapas
import MapView from "./src/Home/MapView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false,}}
        />
      <Stack.Screen
          name="AddProduct"
          component={AddProduct}
        />
      <Stack.Screen
          name="List"
          component={List}
        />
      <Stack.Screen
          name="MapView"
          component={MapView}
        />
        <Stack.Screen
          name="Markets"
          component={Markets}
        />

        <Stack.Screen
          name="ProductsMarket"
          component={ProductsMarket}
          options={{headerShown: false,}}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false,}}
        />

      <Stack.Screen
          name="LoginUser"
          component={LoginUser}
          options={{headerShown: false,}}
        />
        <Stack.Screen
          name="SignUpUser"
          component={SignUpUser}
          options={{headerShown: false,}}
        />
        <Stack.Screen
          name="LoginMarket"
          component={LoginMarket}
          options={{headerShown: false,}}
        />
        <Stack.Screen
          name="SignUpMarket"
          component={SignUpMarket}
          options={{headerShown: false,}}
        />
        

      </Stack.Navigator>

    </NavigationContainer>
  );
}
