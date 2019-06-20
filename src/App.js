import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import DBfunction from './DatabaseSandbox';
export default function App() {
  let number = 0;
  console.log('Development Mode: ' + __DEV__);
  if (__DEV__ === true) DBfunction.findAll();
  if (__DEV__ === true) DBfunction.countAll();
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        onPress={() => {
          console.log(number++);
          DBfunction.add(number);
        }}
      >
        <Text>new data</Text>
      </TouchableOpacity>
      <Text>{__DEV__ ? 'Development Mode' : 'Production Mode'}</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
