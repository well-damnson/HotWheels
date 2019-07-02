import {Google} from 'expo';
import Constant from '../config/Constant';
import DBFunc from '../database/DatabaseFunction';

async function checkToken() {
  let user = await DBFunc.userData();
  if (user) {
    let {accessToken} = user.data;
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
  let user = await DBFunc.userData();
  if (user) {
    alert('Logged In Already as ' + user.data.user.name);
  } else {
    try {
      const result = await Google.logInAsync(Constant.googleSignIn);
      console.log('Result: ' + JSON.stringify(result));

      if (result.type === 'success') {
        console.log(result.accessToken);
        await DBFunc.userLogin(result);
      } else {
        console.log({cancelled: true});
      }
    } catch (e) {
      alert(e.message);
      console.log({
        error: true,
        e: e.message,
      });
    }
  }
}

async function signOut() {
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
    console.log(Google);
    await Google.logOutAsync(config);
    await DBFunc.userLogout();
  }
}

export default {
  signIn,
  signOut,
  checkToken,
};
