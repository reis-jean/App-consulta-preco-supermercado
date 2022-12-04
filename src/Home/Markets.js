import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapViewDirections from "react-native-maps-directions";
import config from "../config";
import styles from '../Style/Style';

export default function Markets( props) {
  

  return (
      <View>
            <Text style={styles.titleMarket} >
                {props.name}
            </Text>
            <Text style={styles.textMarket}>{props.distance.toFixed(2)} KM </Text> 
    </View>
  );
}
