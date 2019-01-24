const path = require('path');

module.exports = {
  configFilePath(base, fileName) {
    return path.join(base, fileName);
  },
};
