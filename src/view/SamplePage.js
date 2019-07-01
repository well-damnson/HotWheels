import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import GoogleService from '../google/GoogleService';
import GoogleDriveService from '../google/GoogleDriveService';

export default class SamplePage extends Component {
  async componentDidMount() {
    // GoogleDriveService.init();
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
        <TouchableOpacity onPress={() => GoogleService.signOut()}>
          <Text>With Google Logout Test Too</Text>
        </TouchableOpacity>
        <Text />
        <Text />
        <TouchableOpacity onPress={() => GoogleDriveService.init()}>
          <Text>With Google Drive Test Too, Again?</Text>
        </TouchableOpacity>
        <Text />
        <Text />
        <TouchableOpacity onPress={() => GoogleDriveService.downloadBackup()}>
          <Text>Download</Text>
        </TouchableOpacity>
        <Text />
        <Text />
        <TouchableOpacity onPress={() => GoogleDriveService.uploadBackup()}>
          <Text>Upload</Text>
        </TouchableOpacity>
        <Text />
        <Text />
        <TouchableOpacity onPress={() => GoogleDriveService.checkfile()}>
          <Text>Check File</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
