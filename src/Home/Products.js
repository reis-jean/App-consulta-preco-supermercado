import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import styles from '../Style/Style';

export default function Products(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.textProduct}>
        { props.nome }
      </Text>
      <Text style={styles.textProduct}>
        { props.preco }
      </Text>
    </View>
  );
}
