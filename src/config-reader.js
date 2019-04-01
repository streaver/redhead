const path = require('path');
const fs = require('fs');

const { configFilePath } = require('../src/helpers/path-generator');
const {
  REDHEAD_DIRECTORY,
  HEADERS_FILE,
  REDIRECTS_FILE,
} = require('../src/helpers/path-constants');

function requireFromString(src, filename) {
  const Module = module.constructor;
  const m = new Module();

  // eslint-disable-next-line no-underscore-dangle
  m._compile(src, filename);

  return m.exports;
}

module.exports = class Reader {
  headers() {
    return this.config(HEADERS_FILE);
  }

  redirects() {
    return this.config(REDIRECTS_FILE);
  }

  // eslint-disable-next-line class-methods-use-this
  config(file) {
    const configPath = configFilePath(REDHEAD_DIRECTORY, file);

    if (fs.existsSync(configPath)) {
      return requireFromString(
        fs.readFileSync(path.join(process.cwd(), configPath)).toString(),
        file,
      );
    }

    return undefined;
  }
};
