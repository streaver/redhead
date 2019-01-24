const { Command, flags: option } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const headersWriter = require('../config-writers/headers');
const redirectsWriter = require('../config-writers/redirects');
const { configFilePath } = require('../helpers/path-generator.js');
const {
  REDHEAD_DIRECTORY,
  HEADERS_FILE,
  REDIRECTS_FILE,
} = require('../helpers/path-constants');

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

class BuildCommand extends Command {
  run() {
    const { flags } = this.parse(BuildCommand);
    const { output } = flags;

    BuildCommand.writeConfig(output);
  }

  static writeConfig(outputFolder) {
    CONFIG_MAPPING.forEach((mapping) => {
      const configPath = configFilePath(REDHEAD_DIRECTORY, mapping.configFile);
      const pathExists = fs.existsSync(configPath);

      if (pathExists) {
        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder);
        }

        const config = require(path.join(process.cwd(), configPath));

        fs.writeFileSync(path.join(process.cwd(), outputFolder, mapping.outputFile), mapping.writer(config));
      }
    });
  }
}

BuildCommand.description = 'Generate the platform specific files based on the configuration';

BuildCommand.flags = {
  output: option.string({
    char: 'o',
    description: 'Folder where the generated files should be saved.',
    default: '.',
  }),
};

module.exports = BuildCommand;
