import {GoogleSignIn} from 'expo';

let Constant = {
  debug: true,
  column: ['brand', 'merk', 'type', 'series', 'name', 'color', 'notes'],
  googleSignIn: {
    scopes: ['profile', 'email', GoogleSignIn.SCOPES.DRIVE_FILE],
    clientId:
      '1007274877925-g8d2f7mdjoh29vt3t9a1cfu01medap85.apps.googleusercontent.com',
  },
};

export default Constant;
