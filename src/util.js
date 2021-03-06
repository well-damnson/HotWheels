import {debug} from './Constant';

/**
 * Logging system based on 'debug' variable on Constant.js
 *
 * @param {*} any
 */
function _log(...any) {
  if (debug) {
    console.log(any);
  }
}

export default {
  log: _log,
};
