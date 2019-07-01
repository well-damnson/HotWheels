import DBFunc from '../database/DatabaseFunction';
import GDrive from './GDrive';

let fileName = 'DieCastCollectors.backup.json';

let init = async () => {
  let user = await DBFunc.userData();
  if (user) {
    GDrive.setAccessToken(user.data.accessToken);
    GDrive.init();
    if (GDrive.isInitialized()) {
      console.log(true);
    } else {
      console.log(false);
    }
  } else {
    alert('You Are Not Logged in');
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
  let data = await (await GDrive.files.list({
    q: "'root' in parents",
  })).json();
  console.log(data);
  return data.files;
};

let _deleteAllData = async () => {
  let files = await checkfile();
  for (let i = 0; i < files.length; i++) {
    await GDrive.files.delete(files[i].id);
  }
};

let uploadBackup = async () => {
  let content = await DBFunc.find();
  await _deleteAllData();
  await _upload(content);
};

let downloadBackup = async () => {
  let files = await checkfile();
  console.log(files);
  if (files.length > 0) {
    let data = await GDrive.files.download(files[0].id);
    console.log(data);
  } else {
    alert('No Backup File Found');
  }
};

export default {init, uploadBackup, checkfile, downloadBackup};
