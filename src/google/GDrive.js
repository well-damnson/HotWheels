export default class GDrive {
  static _urlFiles = 'https://www.googleapis.com/drive/v3/files';
  static _contentTypeJson = 'application/json; charset=UTF-8';

  static init(params = {}) {
    GDrive.files = new Files(params.files);
    GDrive.permissions = new Permissions();
  }

  static setAccessToken(accessToken) {
    GDrive.accessToken = accessToken;
  }

  static isInitialized() {
    return !!GDrive.accessToken;
  }

  static _createHeaders(contentType, contentLength, ...additionalPairs) {
    let pairs = [['Authorization', `Bearer ${GDrive.accessToken}`]];

    [['Content-Type', contentType], ['Content-Length', contentLength]].forEach(
      (data) => (data[1] ? pairs.push(data) : undefined),
    );

    if (additionalPairs) {
      pairs = pairs.concat(additionalPairs);
    }

    const headers = new Headers();

    for (let pair of pairs) {
      headers.append(pair[0], pair[1]);
    }

    return headers;
  }
}

const permissions = '/permissions';

class Permissions {
  create(fileId, params) {
    const body = JSON.stringify(params);

    return fetch(`${GDrive._urlFiles}/${fileId}${permissions}`, {
      method: 'POST',
      headers: GDrive._createHeaders(GDrive._contentTypeJson, body.length),
      body,
    });
  }
}

// import RNFS from "react-native-fs";
import utf8 from 'utf8';
import {StaticUtils, ArrayStringifier} from 'simple-common-utils';
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files';

function _stringifyQueryParams(
  queryParams,
  prefix = '?',
  separator = '&',
  quoteIfString,
) {
  const array = [];

  Object.keys(queryParams).forEach((key) =>
    array.push(
      `${key}=${StaticUtils.safeQuoteIfString(
        queryParams[key],
        quoteIfString,
      )}`,
    ),
  );

  return new ArrayStringifier(array)
    .setPrefix(prefix)
    .setSeparator(separator)
    .process();
}

class Files {
  static mimeFolder = 'application/vnd.google-apps.folder';

  constructor(params = {}) {
    this.params = params;

    [['boundary', 'foo_bar_baz']].forEach(
      (nameValue) =>
        (this.params[nameValue[0]] = this.params[nameValue[0]] || nameValue[1]),
    );
  }

  createFileMultipart(media, mediaType, metadata, isBase64) {
    const ddb = `--${this.params.boundary}`;
    const ending = `\n${ddb}--`;

    let body =
      `\n${ddb}\n` +
      `Content-Type: ${GDrive._contentTypeJson}\n\n` +
      `${JSON.stringify(metadata)}\n\n${ddb}\n` +
      (isBase64 ? 'Content-Transfer-Encoding: base64\n' : '') +
      `Content-Type: ${mediaType}\n\n`;

    if (media.constructor == String) {
      body += `${media}${ending}`;
    } else {
      body = new Uint8Array(
        StaticUtils.encodedUtf8ToByteArray(utf8.encode(body))
          .concat(media)
          .concat(StaticUtils.encodedUtf8ToByteArray(utf8.encode(ending))),
      );
    }

    return fetch(`${uploadUrl}?uploadType=multipart`, {
      method: 'POST',
      headers: GDrive._createHeaders(
        `multipart/related; boundary=${this.params.boundary}`,
        body.length,
      ),
      body,
    });
  }

  delete(fileId) {
    return fetch(`${GDrive._urlFiles}/${fileId}`, {
      method: 'DELETE',
      headers: GDrive._createHeaders(),
    });
  }

  async safeCreateFolder(metadata) {
    let id = await this.getId(
      metadata.name,
      metadata.parents,
      Files.mimeFolder,
    );

    if (!id) {
      metadata.mimeType = Files.mimeFolder;

      const body = JSON.stringify(metadata);

      result = await fetch(GDrive._urlFiles, {
        method: 'POST',
        headers: GDrive._createHeaders(GDrive._contentTypeJson, body.length),
        body,
      });

      if (!result.ok) {
        throw result;
      }

      id = (await result.json()).id;
    }

    return id;
  }

  async getId(name, parents, mimeType, trashed = false) {
    const queryParams = {name, trashed};

    if (mimeType) {
      queryParams.mimeType = mimeType;
    }

    let result = await this.list({
      q:
        _stringifyQueryParams(queryParams, '', ' and ', true) +
        ` and '${parents[0]}' in parents`,
    });

    if (!result.ok) {
      throw result;
    }

    const file = (await result.json()).files[0];

    return file ? file.id : file;
  }

  get(fileId, queryParams) {
    const parameters = _stringifyQueryParams(queryParams);

    return fetch(`${GDrive._urlFiles}/${fileId}${parameters}`, {
      headers: GDrive._createHeaders(),
    });
  }

  download(fileId, downloadFileOptions = {}, queryParams = {}) {
    queryParams.alt = 'media';

    const parameters = _stringifyQueryParams(queryParams);

    downloadFileOptions.fromUrl = `${GDrive._urlFiles}/${fileId}${parameters}`;

    downloadFileOptions.headers = Object.assign(
      {
        Authorization: `Bearer ${GDrive.accessToken}`,
      },
      downloadFileOptions.headers,
    );

    // console.log('downloadOption: ', downloadFileOptions);
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

    return downloadFile(downloadFileOptions);
  }

  list(queryParams) {
    return fetch(`${GDrive._urlFiles}${_stringifyQueryParams(queryParams)}`, {
      headers: GDrive._createHeaders(),
    });
  }

  export(fileId, mimeType) {
    return fetch(`${GDrive._urlFiles}/${fileId}/export?mimeType=${mimeType}`, {
      headers: GDrive._createHeaders(),
    });
  }
}
