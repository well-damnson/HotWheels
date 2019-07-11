import DBFunc from '../database/DatabaseFunction';
import GDrive from './GDrive';
import GoogleService from './GoogleService';
let fileName = 'DieCastCollectors.backup.json';

let initialized = false;

let init = async () => {
  console.log('Initializing Google Drive');
  if (await GoogleService.checkToken()) {
    let user = await DBFunc.userData();
    console.log('GDInit User:', user);
    if (user) {
      GDrive.setAccessToken(user.data.accessToken);
      GDrive.init();
      if (GDrive.isInitialized()) {
        console.log('Google Drive Initialized');
        initialized = true;
      } else {
        initialized = false;
      }
    } else {
      alert('You Are Not Logged in');
      initialized = false;
    }
  } else {
    await GoogleService.signOut();
    initialized = false;
    // await GoogleService.signIn();
  }
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
    await _upload(content);
    alert('Backup Data Uploaded');
  } else {
    await init();
    if (initialized) await uploadBackup();
  }
};

let downloadBackup = async () => {
  if (initialized) {
    let files = await checkfile();
    if (files.length > 0) {
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
  } else {
    await init();
    if (initialized) await downloadBackup();
  }
};

export default {init, uploadBackup, checkfile, downloadBackup};
