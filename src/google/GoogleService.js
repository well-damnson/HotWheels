import {Google} from 'expo';
import Constant from '../config/Constant';
import DBFunc from '../database/DatabaseFunction';
import * as GoogleSignIn from 'expo-google-sign-in';
import {ToastAndroid} from 'react-native';

async function checkToken() {
  let user = await DBFunc.userData();
  if (user) {
    let {accessToken} = user.data;
    alert(user);
    let userInfoResponse = await (await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    )).json();
    if (userInfoResponse.error) {
      await DBFunc.userLogout();
      return false;
    }
    return true;
  } else {
    return false;
  }
}

async function signIn() {
  if (__DEV__) {
    let user = await DBFunc.userData();
    if (user) {
      alert('Logged In Already as ' + user.data.user.name);
    } else {
      try {
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
        alert(e.message);
        // console.log({
        //   error: true,
        //   e: e.message,
        // });
        return false;
      }
    }
  } else {
    let user = await DBFunc.userData();
    if (user) {
      alert('Logged In Already as ' + user.data.user.name);
    } else {
      try {
        await GoogleSignIn.initAsync({
          scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/drive.file',
          ],
        });
      } catch ({message}) {
        alert('GoogleSignIn.initAsync(): ' + message);
      }
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const data = await GoogleSignIn.signInAsync();
        if (data.type === 'success') {
          await DBFunc.userLogin(data);
          //alert('Logged In as ' + data.data.user.name);
          return true;
        } else {
          // console.log({cancelled: true});
          return false;
        }
      } catch ({message}) {
        alert('login: Error:' + message);
        return false;
      }
    }
  }
}

async function signOut() {
  let user = await DBFunc.userData();
  if (!user) {
    alert('No User');
  } else {
    if (__DEV__) {
      let {accessToken} = user.data;
      let {clientId} = Constant.googleSignIn;
      const config = {
        accessToken,
        clientId,
      };
      await Google.logOutAsync(config);
      await DBFunc.userLogout();
      alert('Signed Out Successfully');
    } else {
      try {
        await GoogleSignIn.signOutAsync();
        await DBFunc.userLogout();
        alert('Signed Out Successfully');
      } catch ({message}) {
        alert('signOutAsync: ' + message);
      }
    }
  }
}

export default {
  signIn,
  signOut,
  checkToken,
};
