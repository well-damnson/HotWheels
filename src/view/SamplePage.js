import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import GoogleService from '../GoogleService';

export default class SamplePage extends Component {
  async componentDidMount() {
    //await GoogleService.configuration();
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>This is Just a Test Screen</Text>
        <TouchableOpacity onPress={() => GoogleService.signIn()}>
          <Text>With Google Login Test</Text>
        </TouchableOpacity>
        <Text />
        <Text />
        <Text />
        <Text />
        <Text />
        <TouchableOpacity onPress={() => GoogleService.signOut()}>
          <Text>With Google Logout Test Too</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
