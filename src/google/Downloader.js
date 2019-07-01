let downloadFile = (options) => {
  if (typeof options !== 'object')
    throw new Error('downloadFile: Invalid value for argument `options`');
  if (typeof options.fromUrl !== 'string')
    throw new Error('downloadFile: Invalid value for property `fromUrl`');
  if (options.headers && typeof options.headers !== 'object')
    throw new Error('downloadFile: Invalid value for property `headers`');


  var bridgeOptions = {
    fromUrl: options.fromUrl,
    headers: options.headers || {},
  };

  return _Fetch(bridgeOptions)
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

let _Fetch = (object) => {
  let {headers} = object;
  return fetch(object.fromUrl, {headers});
};

export default downloadFile;
