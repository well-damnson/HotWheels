import EventEmitter from 'events';

let EE = new EventEmitter();

global.WDSTools = {
  EE,
};

export default {};
