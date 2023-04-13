import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Historyscreen from './Historyscreen';
import Currentsscreen from './Currentscreen';

import Swiper from 'react-native-swiper';


export default function Logsscreen  ()  {
  



  return (
        <Swiper showButtons>
          <View style={styles.windowContainer}>
        <Historyscreen />
      </View>
      <View style={styles.windowContainer}>
        <Currentsscreen/>
      </View>
        </Swiper>
  );
  
}


const styles = StyleSheet.create({
  windowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
