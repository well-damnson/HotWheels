import Database from './Database';
import validate from 'validate.js';
let {db} = Database;

let add = (number) => {
  for (let n = 0; n < 100; n++) {
    db.insert({number}, (err, newDoc) => {
      if (err) throw err;
      console.log(newDoc);
    });
  }
};

let findAll = () => {
  db.find({}, (err, docs) => {
    if (err) throw err;
    console.log(docs);
  });
};

let countAll = () => {
  db.count({}, (err, count) => {
    if (err) throw err;
    console.log('Total Count: ' + count);
  });
};
let removeAll = () => {};

export default {add, findAll, removeAll, countAll};
