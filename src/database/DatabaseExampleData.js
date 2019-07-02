// {
//   brand, merk, type, series, name, color, notes;
// }

import DBFunc from './DatabaseFunction';

let exampleData = [
  {
    brand: 'HotWheels',
    merk: 'GM',
    type: 'Vintage',
    series: '2019 Red Edition',
    name: "'57 Chevy",
    color: 'Putih',
  },
  {
    brand: 'HotWheels',
    merk: 'Lamborghini',
    type: 'Exotic',
    series: '2019 Red Edition',
    name: 'Reventon',
    color: 'Merah',
  },
  {
    brand: 'HotWheels',
    merk: 'VolksWagen',
    type: 'Modern Performance',
    series: '2019 Red Edition',
    name: 'Golf GTI',
    color: 'Hitam',
  },
  {
    brand: 'HotWheels',
    merk: 'GM',
    type: 'Vintage',
    series: '2019 Red Edition',
    name: "Custom '53 Cadillac",
    color: 'Merah',
  },
  {
    brand: 'HotWheels',
    merk: 'Dodge',
    type: 'Race',
    series: '2019 Red Edition',
    name: 'SRT Viper GTS-R',
    color: 'Putih',
  },
  {
    brand: 'HotWheels',
    merk: 'HW Original',
    type: 'City',
    series: '2019 Red Edition',
    name: 'Rapid Responder',
    color: 'Merah',
  },
  {
    brand: 'HotWheels',
    merk: 'Dodge',
    type: 'Truck',
    series: '2019 Red Edition',
    name: "'87 Dodge D100",
    color: 'Merah',
  },
];

let ExampleDataInsert = async () => {
  let data = await DBFunc.find();
  if (data.length === 0) {
    for (let index = 0; index < exampleData.length; index++) {
      const element = exampleData[index];
      await DBFunc.addData(element);
    }
  }
};

export default ExampleDataInsert;
