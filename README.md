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
    <a href="https://codeclimate.com/github/streaver/redhead">
      <img src="https://img.shields.io/codeclimate/coverage/streaver/redhead.svg?style=flat" />
    </a>
    <a href="https://codeclimate.com/github/streaver/redhead">
      <img src="https://img.shields.io/codeclimate/maintainability/streaver/redhead.svg?style=flat" />
    </a>
    <a href="https://github.com/streaver/redhead/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/streaver/redhead.svg" />
    </a>
  </p>
</p>

<!-- toc -->
## Table of content
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
  * [init](#redhead-init)
  * [build](#redhead-build)
  * [help](#redhead-help-command)
* [Contributing](#contributing)
* [Credits](#credits)
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
# Usage

```sh-session
$ redhead COMMAND
running command...
$ redhead (-v|--version|version)
redhead/0.1.0 darwin-x64 node-v10.15.0
$ redhead --help [COMMAND]
USAGE
  $ redhead COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
# Commands

* [`redhead init`](#redhead-init)
* [`redhead build`](#redhead-build)
* [`redhead help [COMMAND]`](#redhead-help-command)

## `redhead init`

Initialize the required files for handling your redirects/headers with redhead.

```
USAGE
  $ redhead init

OPTIONS
  -h, --no-headers    Whether or not to handle headers with redhead
  -r, --no-redirects  Whether or not to handle redirects with redhead

DESCRIPTION
  Generates files for handling your headers and/or redirects configuration.
```

## `redhead build`

Generate the platform specific files based on the configuration. Currently we only support [Netlify](https://www.netlify.com/). But we plan to add Firebase Hosting, Heroku, etc.

```
USAGE
  $ redhead build

OPTIONS
  -o, --output=output  [default: .] Folder where the generated files should be saved.
```

## `redhead help [COMMAND]`

Display help for redhead

```
USAGE
  $ redhead help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```
<!-- commandsstop -->

<!-- contributing -->
## Contributing

All contributions or issue reporting are welcomed. If you are filing a bug please include information to help debug it!

If you plan to contribute, please make sure you test the code.

<!-- contributingstop -->

<!-- credits -->
## Credits

- <div>Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<!-- creditsstop -->
