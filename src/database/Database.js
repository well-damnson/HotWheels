import {debug} from '../config/Constant';
import Datastore from 'react-native-local-mongodb';

let db = new Datastore({filename: 'CollectionSaveData', autoload: true});
let userDB = new Datastore({filename: 'userData', autoload: true});
let Database = {
  db,
  userDB,
};

export default Database;
