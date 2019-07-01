import Database from './Database';
import {validate} from 'validate.js';
import Constraint from '../config/Constraint';

/*
 * obj = {brand, merk, type, series, name, color, notes}
 */
let addData = async (obj) => {
  let validation = validate(obj, Constraint.itemConstraint);
  if (validation !== undefined) {
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
  });
};

/*
 * obj = {sort: {by:['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'], asc: boolean}, search: string, filter: [{by: ['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'], value: string}]}
 */
let find = async (obj = {}) => {
  let validation = validate(obj, Constraint.searchItemConstraint);
  if (validation !== undefined) {
    return validation;
  }
  let data = [];
  await Database.db.find({}, (err, docs) => {
    let filteredData = [...docs];
    if (obj.filter) {
      for (let i = 0; i < obj.filter.length; i++) {
        filteredData = _filter(filteredData, obj.filter[i]);
      }
    }
    data = [...filteredData];
  });
  return data;
  //==============Filtering Sequence===================
};

let _filter = (data, filter) => {
  let filteredData = [];
  if (filter !== undefined) {
    let {by, value} = filter;
    for (let i = 0; i < data.length; i++) {
      if (data[i][by] === value) {
        filteredData.push({...data[i]});
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
    notes: [],
  };
  await Database.db.find({}, (err, docs) => {
    for (let i = 0; i < docs.length; i++) {
      if (!columnList.brand.contains(docs[i].brand)) {
        columnList.brand.push(docs[i].brand);
      }
      if (!columnList.merk.contains(docs[i].merk)) {
        columnList.merk.push(docs[i].merk);
      }
      if (!columnList.type.contains(docs[i].type)) {
        columnList.type.push(docs[i].type);
      }
      if (!columnList.series.contains(docs[i].series)) {
        columnList.series.push(docs[i].series);
      }
    }
  });

  return columnList;
};

let edit = async (_id, newData) => {
  let validation = validate(newData, Constraint.searchItemConstraint);
  if (validation !== undefined) {
    return validation;
  }

  await Database.db.find({_id}, async (err, docs) => {
    let data = {...docs, ...newData, updated_at: Date.now()};

    await Database.db.update({_id}, {$set: {...data}});
  });
};

let remove = async (_id) => {
  let data = _id ? {_id} : {};
  await Database.db.remove(data);
};

let userLogin = async (sign) => {
  let {accessToken, idToken, refreshToken, user} = sign;
  let data = {
    accessToken,
    idToken,
    refreshToken,
    user,
  };
  await Database.userDB.insert({data}, (err, newDoc) => {
    if (err) throw err;
  });
};

let userLogout = async () => {
  await Database.userDB.remove({});
};

let userData = async () => {
  let data = [];
  await Database.userDB.find({}, (err, docs) => {
    data = [...docs];
  });
  return data[0] !== undefined ? data[0] : undefined;
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
};
