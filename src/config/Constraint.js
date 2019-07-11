let itemConstraint = {
  brand: {
    presence: true,
    length: {
      minimum: 1,
      message: 'Brand cannot be blank',
    },
  },
  merk: {
    presence: true,
    length: {
      minimum: 1,
      message: 'Manufacture cannot be blank',
    },
  },
  type: {
    presence: true,
    length: {
      minimum: 1,
      message: 'Type cannot be blank',
    },
  },
  series: {},
  name: {
    presence: true,
    length: {
      minimum: 1,
      message: 'Name cannot be blank',
    },
  },
  color: {
    presence: true,
    length: {
      minimum: 1,
      message: 'Color cannot be blank',
    },
  },
  notes: {},
};
let _itemColumn = ['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'];
let searchItemConstraint = {
  sort: {},
  'sort.by': {inclusion: _itemColumn},
  'sort.asc': {type: 'boolean'},
  search: {},
  filter: {},
  'filter.by': {inclusion: _itemColumn},
  'filter.value': {},
};
export default {itemConstraint, searchItemConstraint};
