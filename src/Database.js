import {debug} from './Constant';
import Datastore from 'react-native-local-mongodb';

let db = new Datastore({filename: 'CollectionSaveData', autoload: true});
let userDB = new Datastore({filename: 'userData', autoload: true});
let Database = {
  db,
  userDB,
  uploadToGDrive: () => {},
  downloadFromGDrive: () => {},
};

export default Database;
