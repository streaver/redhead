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

<p align="center"><strong>WARNING:</strong> This is still in active development, make sure you lock your versions!<p>

## Table of content
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
  * [init](#redhead-init)
  * [build](#redhead-build)
  * [help](#redhead-help-command)
* [Examples](#examples)
* [Contributing](#contributing)
* [Credits](#credits)

## Installation

```bash
yarn global add redhead
```

Or you can add it to your `package.json`

```bash
yarn add redhead --dev
```

<!-- usage -->
```sh-session
$ npm install -g redhead
$ redhead COMMAND
running command...
$ redhead (-v|--version|version)
redhead/0.3.2 darwin-x64 node-v10.15.1
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

## `redhead build`

Generate the platform specific files based on the configuration

```
USAGE
  $ redhead build

OPTIONS
  -o, --output=output  [default: .] Folder where the generated files should be saved.
```

_See code: [src/commands/build.js](https://github.com/streaver/redhead/blob/v0.3.2/src/commands/build.js)_

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

## `redhead init`

Initialize the required files

```
USAGE
  $ redhead init

OPTIONS
  -h, --no-headers    Whether or not to handle headers with redhead
  -r, --no-redirects  Whether or not to handle redirects with redhead

DESCRIPTION
  Generates files for handling your headers and/or redirects configuration.
```

_See code: [src/commands/init.js](https://github.com/streaver/redhead/blob/v0.3.2/src/commands/init.js)_
<!-- commandsstop -->

## Examples

### Different config based on environment

For example, if you want to have different headers based on the environment you just need to customize the `headers.js` file for your needs and make sure you ENV variables are set for each case, for Netlify this could be done via the `netlify.toml` file.

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

### Redirecting one path to the latest post

Let's say you have a blog and want to have a `/latest` path that always takes users to the latest post that has been published, this could be easily achieved with RedHead.

```js
// .redhead/redirects.js

// use your DB library here;
const db = require('db').config(process.env.CONNECTION_URL);
const lastPost = db.posts.last();

module.exports = [{
  from: '/latest',
  to: `${lastPost.permalink}`,
  status: '302',
  options: '',
}];

```

## Contributing

All contributions or issue reporting are welcomed. If you are filing a bug please include information to help debug it!

If you plan to contribute, please make sure you test the code.

## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
