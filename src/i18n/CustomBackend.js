import Backend from 'i18next-http-backend';

class CustomBackend extends Backend {
  constructor(services, options = {}) {
    super(services, options);
  }

  read(language, namespace, callback) {
    let loadPath = this.options.loadPath;
    const payload = this.options.parseLoadPayload({
      lng: language,
      ns: namespace,
    });

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath([language], [namespace]);
    }
    const url = this.services.interpolator.interpolate(loadPath, {
      lng: language,
      ns: namespace,
    });
    this.loadUrl(url, callback, language, namespace, payload);
  }

  loadUrl(url, callback, languages, namespaces, payload) {
    this.options.request(this.options, url, payload, (err, res) => {
      if (res && ((res.status >= 500 && res.status < 600) || !res.status))
        return callback(
          'failed loading ' + url + '; status code: ' + res.status,
          true /* retry */
        );
      if (res && res.status >= 400 && res.status < 500)
        return callback(
          'failed loading ' + url + '; status code: ' + res.status,
          false /* no retry */
        );
      if (
        !res &&
        err &&
        err.message &&
        err.message.indexOf('Failed to fetch') > -1
      )
        return callback(
          'failed loading ' + url + ': ' + err.message,
          true /* retry */
        );
      if (err) return callback(err, false);

      let ret, parseErr;
      try {
        if (typeof res.data === 'string') {
          ret = this.options.parse(res.data, languages, namespaces);
        } else {
          // fallback, which omits calling the parse function
          ret = res.data;
        }
      } catch (e) {
        parseErr = 'failed parsing ' + url + ' to json';
      }
      if (parseErr) return callback(parseErr, false);
      callback(null, ret);
    });
  }
}

export default CustomBackend;
