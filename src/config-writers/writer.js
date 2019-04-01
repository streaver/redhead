const ConfigReader = require('../config-reader');

module.exports = class Writer {
  constructor({ outputFolder }) {
    const configReader = new ConfigReader();

    this.outputFolder = outputFolder;
    this.redirectsConfig = configReader.redirects();
    this.headersConfig = configReader.headers();
  }

  write() {
    this.writeRedirects();
    this.writeHeaders();
  }

  // eslint-disable-next-line class-methods-use-this
  writeRedirects() {
    throw new Error('Not Implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  writeHeaders() {
    throw new Error('Not Implemented');
  }
};
