const { Command, flags: option } = require('@oclif/command');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { copySync } = require('fs-extra');

const { configFilePath } = require('../helpers/path-generator.js');
const {
  REDHEAD_DIRECTORY,
  HEADERS_FILE,
  REDIRECTS_FILE,
} = require('../helpers/path-constants');

class InitCommand extends Command {
  run() {
    const { flags } = this.parse(InitCommand);
    const {
      'no-headers': noHeaders,
      'no-redirects': noRedirects,
    } = flags;

    this.log('Initializing files...');

    this.createConfigFolder();

    if (!noHeaders) {
      this.createIfNotExists(REDHEAD_DIRECTORY, HEADERS_FILE);
    }

    if (!noRedirects) {
      this.createIfNotExists(REDHEAD_DIRECTORY, REDIRECTS_FILE);
    }
  }

  createConfigFolder() {
    if (fs.existsSync(REDHEAD_DIRECTORY)) {
      this.existsLog(REDHEAD_DIRECTORY);
    } else {
      fs.mkdirSync(REDHEAD_DIRECTORY);
      this.createdLog(REDHEAD_DIRECTORY);
    }
  }

  createIfNotExists(directory, file) {
    const filePath = configFilePath(directory, file);

    if (fs.existsSync(filePath)) {
      this.existsLog(filePath);
    } else {
      copySync(path.join('src', 'templates', file), path.join(process.cwd(), filePath));

      this.createdLog(filePath);
    }
  }

  createdLog(filePath) {
    this.log(chalk.green(`\tcreate ${filePath}`));
  }

  existsLog(filePath) {
    this.log(chalk.yellow(`\texists ${filePath}`));
  }
}

InitCommand.description = `Initialize the required files

Generates files for handling your headers and/or redirects configuration.
`;

InitCommand.flags = {
  'no-headers': option.boolean({
    char: 'h',
    description: 'Whether or not to handle headers with redhead',
    default: false,
    exclusive: ['no-redirects'],
  }),
  'no-redirects': option.boolean({
    char: 'r',
    description: 'Whether or not to handle redirects with redhead',
    default: false,
    exclusive: ['no-headers'],
  }),
};

module.exports = InitCommand;
