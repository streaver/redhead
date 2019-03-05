const fs = require('fs');
const path = require('path');
const Writer = require('../writer');

const NETLIFY_HEADERS_FILE = '_headers';
const NETLIFY_REDIRECTS_FILE = '_redirects';

module.exports = class NetlifyWriter extends Writer {
  writeRedirects() {
    if (this.redirectsConfig) {
      const redirectsConfigOutput = this.redirectsConfig.map(rule => `${rule.from}\t${rule.to}\t${rule.status}\t${rule.options}`).join('\n');

      this.writeConfig(redirectsConfigOutput, NETLIFY_REDIRECTS_FILE);
    }
  }

  writeHeaders() {
    if (this.headersConfig) {
      const headersConfigOutput = this.headersConfig.map((rule) => {
        const headers = rule.headers.map(h => `\t${h}`).join('\n');

        return `${rule.path}\n${headers}`;
      }).join('\n');

      this.writeConfig(headersConfigOutput, NETLIFY_HEADERS_FILE);
    }
  }

  writeConfig(config, file) {
    if (!fs.existsSync(this.outputFolder)) {
      fs.mkdirSync(this.outputFolder);
    }

    const configOutputPath = path.join(
      process.cwd(),
      this.outputFolder,
      file,
    );

    fs.writeFileSync(configOutputPath, config);
  }
};
