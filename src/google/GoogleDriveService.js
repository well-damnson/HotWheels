import DBFunc from '../database/DatabaseFunction';
import GDrive from './GDrive';
import GoogleService from './GoogleService';
let fileName = 'DieCastCollectors.backup.json';
import {ToastAndroid} from 'react-native';

let initialized = false;

let init = () => {
  // alert('GOOGLE DRIVE INIT');

  // console.log('Initializing Google Drive');
  return new Promise(async (res) => {
    let checkToken = await GoogleService.checkToken();

    if (checkToken) {
      // alert('DRIVE CHECK TOKEN SUCCESS');
      let user = await DBFunc.userData();
      // console.log('GDInit User:', user);
      // alert(`DRIVE INIT USER DATA: ${JSON.stringify(user)}`);
      if (user) {
        // alert(`DRIVE INIT USER DATA: ${JSON.stringify(user)}`);
        // alert(`DRIVE INIT USER TOKEN: ${user.data.accessToken}`);
        GDrive.setAccessToken(user.data.accessToken);
        GDrive.init();
        if (GDrive.isInitialized()) {
          console.log('Google Drive Initialized');
          // alert(`DRIVE INIT SUCCESS`);
          initialized = true;
          res();
        } else {
          initialized = false;
          res();
        }
      } else {
        alert('You Are Not Logged in');
        initialized = false;
        res();
      }
    } else {
      initialized = false;
      res();
      // await GoogleService.signIn();
    }
  });
};

let _upload = async (content) => {
  return await (await GDrive.files.createFileMultipart(
    JSON.stringify(content),
    'application/json',
    {
      parents: ['root'],
      name: fileName,
    },
    false,
  )).json();
};

let checkfile = async () => {
  if (initialized) {
    let data = await (await GDrive.files.list({
      q: "'root' in parents",
    })).json();
    return data.files;
  } else {
    await init();
    if (initialized) await checkfile();
  }
};

let _deleteAllData = async () => {
  let files = await checkfile();
  for (let i = 0; i < files.length; i++) {
    await GDrive.files.delete(files[i].id);
  }
};

let uploadBackup = async () => {
  if (initialized) {
    let content = await DBFunc.find();
    await _deleteAllData();
    ToastAndroid.show('Uploading...', ToastAndroid.SHORT);
    await _upload(content);
    alert('Backup Data Uploaded');
  } else {
    await init();
    if (initialized) await uploadBackup();
  }
};

let downloadBackup = async () => {
  if (initialized) {
    try {
      ToastAndroid.show('Checking File...', ToastAndroid.SHORT);
      let files = await checkfile();
      if (files.length > 0) {
        ToastAndroid.show('Downloading...', ToastAndroid.SHORT);
        let data = await GDrive.files.download(files[0].id);
        await DBFunc.remove();
        for (let index = 0; index < data.length; index++) {
          const {data: element} = data[index];
          await DBFunc.addData(element);
        }
        alert('Download Backup Completed');
      } else {
        alert('No Backup File Found');
      }
    } catch (e) {
      alert(e);
    }
  } else {
    await init();
    if (initialized) await downloadBackup();
  }
};

export default {init, uploadBackup, checkfile, downloadBackup};
