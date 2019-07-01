import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Picker,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Color';
import Fsize from '../FontSize';

export default class Sandboxui extends Component {
  // state = {Brand: '-', Manufacture: '-', Type: '-', Series: '-'};
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={styles.Cardmaster}>
          <View style={styles.flexbutrow}>
            <View style={styles.Cardslave}>
              <Text style={styles.defaulter}>Name:</Text>
              <Text style={styles.defaulter}>Brand:</Text>
              <Text style={styles.defaulter}>Manufacture:</Text>
              <Text style={styles.defaulter}>Type:</Text>
              <Text style={styles.defaulter}>Color:</Text>
              <Text style={styles.defaulter}>Series:</Text>
              <Text style={[styles.defaulter, {flex: 2}]}>Notes:</Text>
            </View>
            <View style={styles.Cardslave}>
              <Text style={styles.defaulter}>Name Placeholder</Text>
              <Text style={styles.defaulter}>Brand Placeholder</Text>
              <Text style={styles.defaulter}>Manufacture Placeholder</Text>
              <Text style={styles.defaulter}>Type Placeholder</Text>
              <Text style={styles.defaulter}>Color Placeholder</Text>
              <Text style={styles.defaulter}>Series Placeholder</Text>
              <Text style={[styles.defaulter, {flex: 2}]}>
                123456789123456789123456789123456789123456789
              </Text>
            </View>
          </View>
          <View style={styles.flexbutrow2}>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('DevPage');
              }}
            >
              <Ionicons name={'md-create'} size={15} color="black">
                <Text>Edit</Text>
              </Ionicons>
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('NotSample');
              }}
            >
              <Ionicons
                name={'md-close-circle-outline'}
                size={15}
                color="tomato"
              >
                <Text>Delete</Text>
              </Ionicons>
            </TouchableOpacity>
            <View style={{flex: 1}} />
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Cardmaster: {
    width: '95%',
    // borderWidth: 3,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: Color.main,
    padding: 10,
    flex: 1,
    flexGrow: 1,
  },

  Cardslave: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexbutrow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexbutrow2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 2,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Color.accent,
    fontSize: 15,
    borderRadius: 15,
  },
  centaur: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // if center fails use this style👇
  centerizer: {
    alignSelf: 'center',
    flex: 1,
    // fontSize: 25,
  },
  //for default text preset👇
  defaulter: {
    flex: 1,
    fontSize: 15,
  },
  //for (:) spacer👇
  thespacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
