import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
  } from 'react-native';

  export default class SamplePage extends Component{
      render() {
          return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is Just a Test Screen</Text>
        </View>
          );
      }
  }