const fs = require('fs');
const path = require('path');
const Writer = require('../writer');
const { configFilePath } = require('../../helpers/path-generator.js');
const { REDHEAD_DIRECTORY } = require('../../helpers/path-constants');

const {
  HEADERS_FILE,
  REDIRECTS_FILE,
} = require('../../helpers/path-constants');

function headersWriter(config) {
  return config.map((rule) => {
    const headers = rule.headers.map(h => `\t${h}`).join('\n');

    return `${rule.path}\n${headers}`;
  }).join('\n');
}

function redirectsWriter(config) {
  return config.map(rule => `${rule.from}\t${rule.to}\t${rule.status}\t${rule.options}`).join('\n');
}

const CONFIG_MAPPING = [
  {
    configFile: HEADERS_FILE,
    outputFile: '_headers',
    writer: headersWriter,
  },
  {
    configFile: REDIRECTS_FILE,
    outputFile: '_redirects',
    writer: redirectsWriter,
  },
];

module.exports = class NetlifyWriter extends Writer {
  write() {
    CONFIG_MAPPING.forEach((mapping) => {
      const configPath = configFilePath(REDHEAD_DIRECTORY, mapping.configFile);
      const pathExists = fs.existsSync(configPath);

      if (pathExists) {
        if (!fs.existsSync(this.output)) {
          fs.mkdirSync(this.output);
        }

        // eslint-disable-next-line global-require, import/no-dynamic-require
        const config = require(path.join(process.cwd(), configPath));

        const configOutputPath = path.join(
          process.cwd(),
          this.output,
          mapping.outputFile,
        );

        fs.writeFileSync(configOutputPath, mapping.writer(config));
      }
    });
  }
};
