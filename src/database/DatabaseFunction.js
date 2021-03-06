import Database from './Database';
import {validate} from 'validate.js';
import Constraint from '../config/Constraint';

/*
 * obj = {merk, tahun, series, name, color, notes}
 */
let addData = async (obj) => {
  // console.log(obj);
  let validation = validate(obj, Constraint.itemConstraint);
  // console.log(validation);
  if (validation !== undefined) {
    // console.log(validation);
    return validation;
  }

  let {merk, tahun, series, name, color, notes} = obj;
  let now = Date.now();
  let data = {
    merk,
    tahun,
    series,
    name,
    color,
    notes,
    created_at: now,
    updated_at: now,
  };
  return new Promise((res) => {
    Database.db.insert({data}, (err, newDoc) => {
      if (err) rej(err);
      console.log('Data Added');
      refreshData();
      res();
    });
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
 * obj = {filter: [{by: ['merk', 'tahun', 'series', 'name', 'color', 'notes'], value: string}]}
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
  data = data.sort((a, b) => {
    console.log(a, b);
    return (a.data.name > b.data.name) - (a.data.name < b.data.name);
  });

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

let filterList = async (def = {}) => {
  let columnList = {
    merk: [],
    tahun: [],
    series: [],
    name: [],
    color: [],
  };

  let docs = await _f();
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].data.merk && !columnList.merk.includes(docs[i].data.merk)) {
      columnList.merk.push(docs[i].data.merk);
    }
    if (docs[i].data.tahun && !columnList.tahun.includes(docs[i].data.tahun)) {
      columnList.tahun.push(docs[i].data.tahun);
    }
    if (
      docs[i].data.series &&
      !columnList.series.includes(docs[i].data.series)
    ) {
      columnList.series.push(docs[i].data.series);
    }
    if (docs[i].data.name && !columnList.name.includes(docs[i].data.name)) {
      columnList.name.push(docs[i].data.name);
    }
    if (docs[i].data.color && !columnList.color.includes(docs[i].data.color)) {
      columnList.color.push(docs[i].data.color);
    }
  }
  columnList = {
    merk: columnList.merk.sort(),
    tahun: columnList.tahun.sort(),
    series: columnList.series.sort(),
    name: columnList.name.sort(),
    color: columnList.color.sort(),
  };

  return columnList;
};

let filterName = async (obj) => {
  let data = await find(obj);
  let name = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].data.name && !name.includes(data[i].data.name)) {
      name.push(data[i].data.name);
    }
  }

  return name;
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
  console.log('userLogin sign in data:', sign);
  let {accessToken, idToken, refreshToken, user} = sign;
  let data = {
    accessToken: accessToken || user.auth.accessToken,
    idToken: idToken || user.auth.idToken,
    refreshToken: refreshToken || user.auth.refreshToken,
    user,
  };
  // alert(`userLogin Data: ${JSON.stringify(data)}`);
  return new Promise((res, rej) => {
    Database.userDB.insert({data}, (err, newDoc) => {
      if (err) rej(err);
      console.log('Data Inserted:', newDoc);
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

let userData = () => {
  return new Promise(async (res, rej) => {
    let data = [];
    await Database.userDB.find({}, (err, docs) => {
      if (err) rej(err);
      data = [...docs];
    });
    data[0] !== undefined ? res(data[0]) : res(undefined);
  });
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
  filterName,
};
