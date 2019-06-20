import {debug} from './Constant';
import Datastore from 'react-native-local-mongodb';

let db = new Datastore({filename: 'CollectionSaveData', autoload: true});
let Database = {
  db,
  uploadToGDrive: () => {},
  downloadFromGDrive: () => {},
};

export default Database;
