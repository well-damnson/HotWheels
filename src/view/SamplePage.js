import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import ExampleValidation from '../database/DatabaseExampleData';

import GoogleService from '../google/GoogleService';
import GoogleDriveService from '../google/GoogleDriveService';
import DBFunc from '../database/DatabaseFunction';

export default class SamplePage extends Component {
  async componentDidMount() {
    ExampleValidation();
  }
  render() {
    return (
      <ScrollView>
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
          <Text />
          <Text />
          <TouchableOpacity
            onPress={async () => console.log(await DBFunc.find())}
          >
            <Text>LocalDatabase</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
