RedHead
===============

<p align="center">
  <img src="https://user-images.githubusercontent.com/7522836/52180611-50422c80-27c7-11e9-92c1-3ee2d4b6bd83.png" height="150px">
  <p align="center">Dynamically setup headers and redirects for you static deployments.<p>
  <p align="center">
    <a href="https://npmjs.org/package/redhead">
      <img src="https://img.shields.io/npm/v/redhead.svg" />
    </a>
    <a href="https://oclif.io">
      <img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg" />
    </a>
    <a href="https://circleci.com/gh/streaver/redhead/tree/master">
      <img src="https://circleci.com/gh/streaver/redhead/tree/master.svg?style=shield" />
    </a>
    <a href="https://codeclimate.com/github/streaver/redhead/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/3e69b841f5089cb9b11c/maintainability" />
    </a>
    <a href="https://codeclimate.com/github/streaver/redhead/test_coverage">
      <img src="https://api.codeclimate.com/v1/badges/3e69b841f5089cb9b11c/test_coverage" />
    </a>
    <a href="https://github.com/streaver/redhead/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/streaver/redhead.svg" />
    </a>
  </p>
</p>

<!-- toc -->

<!-- tocstop -->

<!-- installation -->

<p align="center"><strong>WARNING:</strong> This is still in active development, make sure you lock your versions!<p>

## Installation

```bash
yarn global add redhead
```

Or you can add it to your `package.json`

```bash
yarn add redhead --dev
```
<!-- installationstop -->

<!-- usage -->
```sh-session
$ npm install -g redhead
$ redhead COMMAND
running command...
$ redhead (-v|--version|version)
redhead/0.3.0 darwin-x64 node-v10.15.0
$ redhead --help [COMMAND]
USAGE
  $ redhead COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
* [`redhead build`](#redhead-build)
* [`redhead help [COMMAND]`](#redhead-help-command)
* [`redhead init`](#redhead-init)

## `redhead init`

Initialize the required files. This fill create the folder `.redhead` with the files `.redhead/headers.js` and/or `.redhead/redirects.js` where you can dynamically define your headers/redirects.

```
USAGE
  $ redhead init

OPTIONS
  -h, --no-headers    Whether or not to handle headers with redhead
  -r, --no-redirects  Whether or not to handle redirects with redhead

DESCRIPTION
  Generates files for handling your headers and/or redirects configuration.
```

_See code: [src/commands/init.js](https://github.com/streaver/redhead/blob/v0.3.0/src/commands/init.js)_

For example, if you want to have different headers based on the environment you just need to custommize the `headers.js` file for your needs:

```js
// .redhead/headers.js

const headers = [];

if (process.env.NODE_ENV === 'production') {
  headers.push({
    path: '/cool',
    headers: [
      'X-Cool: 123'
    ],
  });
}

module.exports = headers;

```

<!-- commandsstop -->

## `redhead build`

Generate the platform specific files based on the configuration. Currently only [Netlify](https://netlify.com) is supported, but we plan to add support for [Firebase Hosting](https://firebase.google.com/docs/hosting/) and [Heroku Buildpack Static](https://github.com/heroku/heroku-buildpack-static)

```
USAGE
  $ redhead build

OPTIONS
  -o, --output=output  [default: .] Folder where the generated files should be saved.
```

_See code: [src/commands/build.js](https://github.com/streaver/redhead/blob/v0.3.0/src/commands/build.js)_

## `redhead help [COMMAND]`

display help for redhead

```
USAGE
  $ redhead help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

<!-- contributing -->
## Contributing

All contributions or issue reporting are welcomed. If you are filing a bug please include information to help debug it!

If you plan to contribute, please make sure you test the code.

<!-- contributingstop -->

<!-- credits -->
## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<!-- creditsstop -->
