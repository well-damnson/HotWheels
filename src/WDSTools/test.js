import DBFunc from '../database/DatabaseFunction';

async function a() {
  let searchParams = {
    filter: [
      {by: 'merk', value: 'GM'},
      {by: 'brand', value: ''},
      {by: 'type', value: ''},
      {by: 'series', value: ''},
    ],
  };
  console.log((await DBFunc.find(searchParams)).length);
}

export default a;
