import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Color';

import ExampleValidation from '../database/DatabaseExampleData';

import GoogleService from '../google/GoogleService';
import GoogleDriveService from '../google/GoogleDriveService';
import DBFunc from '../database/DatabaseFunction';

export default class Profile extends Component {
  state = {
    validity: false,
    user: {name: '', email: ''},
  };
  async componentDidMount() {
    // ExampleValidation();
    let validity = await GoogleService.checkToken();
    let user = await DBFunc.userData();
    if (user !== undefined) {
      await GoogleDriveService.init();
    }
    console.log(user);
    this.setState({validity, user: user.data.user || {name: '', email: ''}});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <Text style={{flex: 1, fontSize: 25}}>
          {this.state.validity
            ? `Logged in as ${this.state.user.name}`
            : 'Please Login First'}
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (this.state.validity === false) {
              await GoogleService.signIn();
              let user = await DBFunc.userData();
              if (user !== undefined) {
                await GoogleDriveService.init();
              }
              console.log(user);
              this.setState({
                validity: true,
                user: user.data.user || {name: '', email: ''},
              });
            } else if (this.state.validity === true) {
              await GoogleService.signOut();
              this.setState({validity: false, user: {name: '', email: ''}});
            }
          }}
        >
          <Ionicons name={'logo-google'} size={15} color={Color.sub}>
            <Text>
              {this.state.validity
                ? ' Log out from google'
                : ' Login to Google'}
            </Text>
          </Ionicons>
        </TouchableOpacity>
        <View style={{flex: 2}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => GoogleDriveService.uploadBackup()}
        >
          <Ionicons name={'ios-arrow-round-up'} size={15} color={Color.sub}>
            <Text> Upload Data to GDrive</Text>
          </Ionicons>
        </TouchableOpacity>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => GoogleDriveService.downloadBackup()}
        >
          <Ionicons name={'ios-arrow-round-down'} size={15} color={Color.sub}>
            <Text> Download Data from GDrive</Text>
          </Ionicons>
        </TouchableOpacity>
        <View style={{flex: 0.5}} />
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
  flexbutrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexbutrow2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: Color.accent,
    fontSize: 15,
    borderRadius: 15,
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
  defaulter2: {
    flex: 2,
    fontSize: 15,
  },
  //for (:) spacer👇
  thespacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  // styles for modals here
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ModalSlave: {
    flex: 1,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.sub,
    borderRadius: 5,
  },
});
