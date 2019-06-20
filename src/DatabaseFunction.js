import Database from './Database';
import {validate} from 'validate.js';
import Constraint from './Constraint';

/*
 * obj = {brand, merk, type, series, name, color, notes}
 */
let addData = (obj) => {
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
  Database.db.insert({data}, (err, newDoc) => {
    if (err) throw err;
  });
};

/*
 * obj = {sort: {by:['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'], asc: boolean}, search: string, filter: [{by: ['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'], value: string}]}
 */
let find = (obj) => {
  let validation = validate(obj, Constraint.searchItemConstraint);
  if (validation !== undefined) {
    return validation;
  }

  let data = Database.db.find({});

  //==============Filtering Sequence===================
  let filteredData = [...data];
  for (let i = 0; i < obj.filter.length; i++) {
    filteredData = _filter(filteredData, obj.filter[i]);
  }
  return filteredData;
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

let filterList = () => {
  let data = Database.db.find({});
  let columnList = {
    brand: [],
    merk: [],
    type: [],
    series: [],
    name: [],
    color: [],
    notes: [],
  };

  for (let i = 0; i < data.length; i++) {
    if (!columnList.brand.contains(data[i].brand)) {
      columnList.brand.push(data[i].brand);
    }
    if (!columnList.merk.contains(data[i].merk)) {
      columnList.merk.push(data[i].merk);
    }
    if (!columnList.type.contains(data[i].type)) {
      columnList.type.push(data[i].type);
    }
    if (!columnList.series.contains(data[i].series)) {
      columnList.series.push(data[i].series);
    }
  }

  return columnList;
};

let edit = (_id, newData) => {
  let data = Database.db.find({_id});
  data = {...data, ...newData, updated_at: Date.now()};

  let validation = validate(data, Constraint.searchItemConstraint);
  if (validation !== undefined) {
    return validation;
  }

  Database.db.update({_id}, {$set: {...data}});
};

let remove = (_id) => {
  let data = _id ? {_id} : {};
  Database.db.remove(data);
};

/*
 * NO USAGE
 */
let a = () => {
  //==============Searching Sequence===================
  let searchedData = [];
  if (obj.search !== undefined) {
    let {search} = obj;
    for (let i = 0; i < filteredData.length; i++) {
      if (
        filteredData[i][brand].contains(search) ||
        filteredData[i][merk].contains(search) ||
        filteredData[i][type].contains(search) ||
        filteredData[i][series].contains(search) ||
        filteredData[i][name].contains(search) ||
        filteredData[i][color].contains(search) ||
        filteredData[i][notes].contains(search)
      ) {
        searchedData.push({...filteredData[i]});
      }
    }
  } else {
    for (let i = 0; i < filteredData.length; i++) {
      searchedData.push({...filteredData[i]});
    }
  }

  //==============Sorting Sequence===================
  let sortedData = [];
  if (obj.sort !== undefined) {
    let {by, asc} = obj.sort;
    let sortComparison = (a, b) => {
      if (asc === true) {
        if (a[by] < b[by]) return 1;
        else if (a[by] > b[by]) return -1;
        else return 0;
      } else {
        if (a[by] > b[by]) return 1;
        else if (a[by] < b[by]) return -1;
        else return 0;
      }
    };
    sortedData = [...searchedData.sort(sortComparison)];
  }
  return sortedData;
};
