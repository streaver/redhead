const { Command, flags: option } = require('@oclif/command');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const REDHEAD_DIRECTORY = '.redhead';
const HEADERS_FILE = 'headers';
const REDIRECTS_FILE = 'redirects';

class InitCommand extends Command {
  run() {
    const { flags } = this.parse(InitCommand);
    const {
      extension,
      'no-headers': noHeaders,
      'no-redirects': noRedirects,
    } = flags;

    this.log('Initializing files...');

    this.createConfigFolder();

    if (!noHeaders) {
      this.createHeadersFile(extension);
    }

    if (!noRedirects) {
      this.createRedirectsFile(extension);
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

  createHeadersFile(extension) {
    const headersFilePath = InitCommand.configFilePath(HEADERS_FILE, extension);

    this.createIfNotExists(headersFilePath);
  }

  createRedirectsFile(extension) {
    const redirectsFilePath = InitCommand.configFilePath(REDIRECTS_FILE, extension);

    this.createIfNotExists(redirectsFilePath);
  }

  createIfNotExists(filePath) {
    if (fs.existsSync(filePath)) {
      this.existsLog(filePath);
    } else {
      fs.closeSync(fs.openSync(filePath, 'w'));
      this.createdLog(filePath);
    }
  }

  createdLog(filePath) {
    this.log(chalk.green(`\tcreate ${filePath}`));
  }

  existsLog(filePath) {
    this.log(chalk.yellow(`\texists ${filePath}`));
  }

  static configFilePath(fileName, extension) {
    return path.join(REDHEAD_DIRECTORY, `${fileName}.${extension}`);
  }
}

InitCommand.description = `Initialize the required files

Generates files for handling your headers and/or redirects configuration.
`;

InitCommand.flags = {
  extension: option.string({
    char: 'e',
    description: 'Desired extension for generating config files.',
    options: ['js'],
    default: 'js',
  }),
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
