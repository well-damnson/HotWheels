let itemConstraint = {
  brand: {
    presence: true,
  },
  merk: {
    presence: true,
  },
  type: {
    presence: true,
  },
  series: {},
  name: {
    presence: true,
  },
  color: {
    presence: true,
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
