import {Google} from 'expo';
import Constant from '../config/Constant';
import DBFunc from '../database/DatabaseFunction';
import * as GoogleSignIn from 'expo-google-sign-in';
import {ToastAndroid} from 'react-native';

let productionInitialized = false;

async function productionGoogleInit() {
  try {
    await GoogleSignIn.initAsync({
      scopes: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
    productionInitialized = true;
  } catch ({message}) {
    alert('SignIn Initialization Error: ' + message);
  }
}

function checkToken() {
  return new Promise(async (res) => {
    if (__DEV__) {
      let user = await DBFunc.userData();
      // alert('USER DATA:' + JSON.stringify(user));
      if (user) {
        let {accessToken} = user.data;
        //alert(user);
        let userInfoResponse = await (await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        )).json();
        if (userInfoResponse.error) {
          await signOut();
          await DBFunc.userLogout();
          res(false);
        }
        res(true);
      } else {
        res(false);
      }
    } else {
      if (!productionInitialized) {
        await productionGoogleInit();
      }
      let data = GoogleSignIn.getCurrentUser();
      if (data) {
        res(true);
      }
      res(false);
    }
  });
}

async function signIn() {
  if (__DEV__) {
    let user = await DBFunc.userData();
    if (user) {
      // alert('Logged In Already as ' + user.data.user.name);
    } else {
      try {
        console.log('Try Login');
        const result = await Google.logInAsync(Constant.googleSignIn);
        console.log(result);

        if (result.type === 'success') {
          // console.log(result.accessToken);
          await DBFunc.userLogin(result);
          return true;
        } else {
          // console.log({cancelled: true});
          return false;
        }
      } catch (e) {
        // alert('SignIn Error: ' + e.message);
        // console.log({
        //   error: true,
        //   e: e.message,
        // });
        return false;
      }
    }
  } else {
    try {
      if (!productionInitialized) {
        await productionGoogleInit();
      }
      await GoogleSignIn.askForPlayServicesAsync();
      const data = await GoogleSignIn.signInAsync();
      //alert(JSON.stringify(data))
      if (data.type === 'success') {
        await DBFunc.userLogin(data);
        ToastAndroid.show(
          'Logged in as ' + data.user.displayName,
          ToastAndroid.SHORT,
        );
        //alert('Logged In as ' + data.data.user.name);
        return true;
      } else {
        // console.log({cancelled: true});
        return false;
      }
    } catch ({message}) {
      alert(`login: Error: ${JSON.stringify(message)}`);
      return false;
    }
  }
}

async function signOut() {
  if (__DEV__) {
    let user = await DBFunc.userData();
    if (!user) {
      alert('No User');
    } else {
      let {accessToken} = user.data;
      let {clientId} = Constant.googleSignIn;
      const config = {
        accessToken,
        clientId,
      };
      await Google.logOutAsync(config);
      await DBFunc.userLogout();
      alert('Signed Out Successfully');
    }
  } else {
    try {
      // await GoogleSignIn.signOutAsync();
      await GoogleSignIn.disconnectAsync();
      await DBFunc.userLogout();
      alert('Signed Out Successfully');
    } catch ({message}) {
      alert('signOutAsync: ' + message);
    }
  }
}

export default {
  signIn,
  signOut,
  checkToken,
};
