const { Command, flags: option } = require('@oclif/command');
const path = require('path');

class BuildCommand extends Command {
  run() {
    const { flags } = this.parse(BuildCommand);
    const { output, platform } = flags;

    BuildCommand.writeConfig(output, platform);
  }

  static writeConfig(outputFolder, platform) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const PlatformWriter = require(path.join(__dirname, '..', 'config-writers', 'platforms', `${platform}.js`));
    const platformWriterInstance = new PlatformWriter(outputFolder);

    platformWriterInstance.write();
  }
}

BuildCommand.description = 'Generate the platform specific files based on the configuration';

BuildCommand.flags = {
  output: option.string({
    char: 'o',
    description: 'Folder where the generated files should be saved.',
    default: '.',
  }),
  platform: option.string({
    char: 'p',
    description: 'The target platform for the generated files',
    options: ['netlify'],
    default: 'netlify',
  }),
};

module.exports = BuildCommand;
