import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
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
    // try {
    //   let validity = await GoogleService.checkToken();
    //   // ToastAndroid.show(
    //   //   `checktoken done with result: ${validity}`,
    //   //   ToastAndroid.SHORT,
    //   // );
    //   // await alert(`checktoken done with result: ${validity}`);
    //   let user = undefined;
    //   if (validity === true) {
    //     user = await DBFunc.userData();
    //     // ToastAndroid.show(`user: ${JSON.stringify(user)}`, ToastAndroid.SHORT);
    //     // alert(JSON.stringify(user));
    //     if (user !== undefined) {
    //       await GoogleDriveService.init();
    //     }
    //     // console.log(user);
    //     this.setState(
    //       {
    //         validity,
    //         user: (validity && user && user.data.user) || {name: '', email: ''},
    //       },
    //       () => {
    //         // ToastAndroid.show(
    //         //   `COMPONENT DID MOUNT SET STATE DONE WITH DATA: ${JSON.stringify({
    //         //     silentLogin: false,
    //         //     validity,
    //         //     user: (validity && user && user.data.user) || {
    //         //       name: '',
    //         //       email: '',
    //         //     },
    //         //   })}`,
    //         //   ToastAndroid.SHORT,
    //         // );
    //         // alert(
    //         //   `COMPONENT DID MOUNT SET STATE DONE WITH DATA: ${JSON.stringify({
    //         //     silentLogin: false,
    //         //     validity,
    //         //     user: (validity && user && user.data.user) || {name: '', email: ''},
    //         //   })}`,
    //         // );
    //       },
    //     );
    //   } else {
    //     this.setState(
    //       {
    //         validity: false,
    //         user: {name: '', email: ''},
    //       },
    //       () => {
    //         // ToastAndroid.show(
    //         //   `COMPONENT DID MOUNT SET STATE DONE WITH DATA: ${JSON.stringify({
    //         //     silentLogin: false,
    //         //     validity: false,
    //         //     user: {name: '', email: ''},
    //         //   })}`,
    //         //   ToastAndroid.SHORT,
    //         // );
    //         // alert(
    //         //   `COMPONENT DID MOUNT SET STATE DONE WITH DATA: ${JSON.stringify({
    //         //     silentLogin: false,
    //         //     validity,
    //         //     user: (validity && user && user.data.user) || {name: '', email: ''},
    //         //   })}`,
    //         // );
    //       },
    //     );
    //   }
    // } catch (e) {
    //   alert(`error: ${e}`);
    // }
  }

  render() {
    // console.log('validity', this.state.validity);
    // ToastAndroid.show(
    //   `State: ${JSON.stringify(this.state)}`,
    //   ToastAndroid.SHORT,
    // );
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <Text style={{flex: 1, fontSize: 25}}>
          {this.state.validity
            ? `Logged in as ${this.state.user.name ||
                this.state.user.displayName}`
            : 'Please Login First'}
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (this.state.validity === false) {
              try {
                let result = await GoogleService.signIn();
                let user;
                if (result) {
                  user = await DBFunc.userData();
                  // alert(`BUTTON USER DATA RESULT: ${JSON.stringify(user)}`);
                  if (!!user) {
                    // alert(`START GOOGLE DRIVE INIT`);
                    await GoogleDriveService.init();
                  }
                  // console.log(user);
                }
                // alert(
                //   `PROFILE USER GET FROM LOGIN BUTTON: ${JSON.stringify(user)}`,
                // );
                this.setState(
                  {
                    validity: !!result,
                    user: (result && user && user.data.user) || {
                      name: '',
                      email: '',
                    },
                  },
                  () => {
                    // alert(`SetState DONE`);
                  },
                );
              } catch (e) {
                alert(e);
              }
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
          disabled={!this.state.validity ? true : false}
          style={[
            styles.button,
            {
              backgroundColor: !this.state.validity ? 'gray' : Color.accent,
            },
          ]}
          onPress={async () => {
            await GoogleDriveService.uploadBackup();
          }}
        >
          <Ionicons name={'ios-arrow-round-up'} size={15} color={Color.sub}>
            <Text>{'Upload Data to GDrive'}</Text>
          </Ionicons>
        </TouchableOpacity>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          disabled={!this.state.validity ? true : false}
          style={[
            styles.button,
            {
              backgroundColor: !this.state.validity ? 'gray' : Color.accent,
            },
          ]}
          onPress={async () => {
            await GoogleDriveService.downloadBackup();
          }}
        >
          <Ionicons name={'ios-arrow-round-down'} size={15} color={Color.sub}>
            <Text>{'Download Data from GDrive'}</Text>
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
