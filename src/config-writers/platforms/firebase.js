const fs = require('fs');
const path = require('path');
const Writer = require('../writer');

const FIREBASE_CONFIG_FILE = 'firebase.json';
const FIREBASE_HEADERS_KEY = 'headers';
const FIREBASE_REDIRECTS_KEY = 'redirects';

module.exports = class FirebaseWriter extends Writer {
  writeRedirects() {
    if (this.redirectsConfig) {
      const redirectsConfigOutput = this.redirectsConfig
        .map(rule => ({ source: rule.from, destination: rule.to, type: rule.status }));

      this.mergeConfig(FIREBASE_REDIRECTS_KEY, redirectsConfigOutput);
    }
  }

  writeHeaders() {
    if (this.headersConfig) {
      const headersConfigOutput = this.headersConfig
        .map((rule) => {
          const headers = rule.headers.map((header) => {
            const [key, value] = header.split(/:\s?/);

            return { key, value };
          });

          return {
            source: rule.path,
            headers,
          };
        });

      this.mergeConfig(FIREBASE_HEADERS_KEY, headersConfigOutput);
    }
  }

  mergeConfig(key, config) {
    const firebaseConfig = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), FIREBASE_CONFIG_FILE)),
    );

    if (config && !firebaseConfig[key]) {
      firebaseConfig.hosting[key] = config;
    }

    this.writeConfig(firebaseConfig);
  }

  writeConfig(config) {
    const configOutputPath = path.join(
      process.cwd(),
      this.outputFolder,
      FIREBASE_CONFIG_FILE,
    );

    fs.writeFileSync(configOutputPath, JSON.stringify(config, null, 2));
  }
};
