import Database from './Database';
import {validate} from 'validate.js';
import Constraint from '../config/Constraint';

/*
 * obj = {brand, merk, type, series, name, color, notes}
 */
let addData = async (obj) => {
  console.log(obj);
  let validation = validate(obj, Constraint.itemConstraint);
  console.log(validation);
  if (validation !== undefined) {
    console.log(validation);
    return validation;
  }

  let {brand, merk, type, series, name, color, notes} = obj;
  let now = Date.now();
  let data = {
    brand,
    merk,
    type,
    series,
    name,
    color,
    notes,
    created_at: now,
    updated_at: now,
  };
  await Database.db.insert({data}, (err, newDoc) => {
    if (err) throw err;
    console.log('Data Added');
    refreshData();
  });
};

let _f = () => {
  return new Promise((resolve, reject) => {
    Database.db.find({}, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};
/*
 * obj = {filter: [{by: ['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'], value: string}]}
 */
let find = async (obj = {}) => {
  let validation = validate(obj, Constraint.searchItemConstraint);
  if (validation !== undefined) {
    return validation;
  }

  let data = [];

  let filteredData = [...(await _f())];
  if (obj.filter) {
    for (let i = 0; i < obj.filter.length; i++) {
      filteredData = _filter(filteredData, obj.filter[i]);
    }
  }
  data = [...filteredData];

  console.log('Data Found: ', data.length);
  return data;
  //==============Filtering Sequence===================
};

let _filter = (data, filter) => {
  let filteredData = [];
  if (
    filter !== undefined &&
    filter.value !== undefined &&
    filter.value.length !== 0
  ) {
    let {by, value} = filter;
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      if (element.data[by] === value) {
        filteredData.push({...element});
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      filteredData.push({...data[i]});
    }
  }
  return filteredData;
};

let filterList = async () => {
  let columnList = {
    brand: [],
    merk: [],
    type: [],
    series: [],
    name: [],
    color: [],
  };

  let docs = await _f();
  for (let i = 0; i < docs.length; i++) {
    if (!columnList.brand.includes(docs[i].data.brand)) {
      columnList.brand.push(docs[i].data.brand);
    }
    if (!columnList.merk.includes(docs[i].data.merk)) {
      columnList.merk.push(docs[i].data.merk);
    }
    if (!columnList.type.includes(docs[i].data.type)) {
      columnList.type.push(docs[i].data.type);
    }
    if (!columnList.series.includes(docs[i].data.series)) {
      columnList.series.push(docs[i].data.series);
    }
    if (!columnList.name.includes(docs[i].data.name)) {
      columnList.name.push(docs[i].data.name);
    }
    if (!columnList.color.includes(docs[i].data.color)) {
      columnList.color.push(docs[i].data.color);
    }
  }

  return columnList;
};

let edit = async (_id, newData) => {
  let validation = validate(newData, Constraint.itemConstraint);
  if (validation !== undefined) {
    return validation;
  }

  // await Database.db.find({_id}, async (err, docs) => {
  //   let data = {...docs, ...newData, updated_at: Date.now()};

  //   await Database.db.update({_id}, {$set: {...data}});
  //   console.log('Data Edited');
  //   refreshData();
  // });
  let data = await _f();
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === _id) {
      let pushData = {...data[i].data, ...newData, updated_at: Date.now()};
      await Database.db.update({_id}, {$set: {data: {...pushData}}});
      console.log('Data Edited');
      refreshData();
    }
  }
};

let remove = async (_id) => {
  let data = _id ? {_id} : {};
  await Database.db.remove(data, {multi: true});
  console.log('Data Removed');
  refreshData();
};

let userLogin = async (sign) => {
  let {accessToken, idToken, refreshToken, user} = sign;
  let data = {
    accessToken,
    idToken,
    refreshToken,
    user,
  };
  return new Promise((res, rej) => {
    Database.userDB.insert({data}, (err, newDoc) => {
      if (err) rej(err);
      console.log('Data Inserted')
      res();
    });
  });
  //, (err, newDoc) => {
  //   if (err) throw err;
  //   console.log('Data Inserted');
  // }
};

let userLogout = async () => {
  await Database.userDB.remove({}, {multi: true});
};

let userData = async () => {
  let data = [];
  await Database.userDB.find({}, (err, docs) => {
    data = [...docs];
  });
  return data[0] !== undefined ? data[0] : undefined;
};

let refreshData = () => {
  WDSTools.EE.emit('refreshData');
};

export default {
  addData,
  find,
  filterList,
  edit,
  remove,
  userLogin,
  userLogout,
  userData,
  refreshData,
};
