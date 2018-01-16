const path = require('path');
const argv = require('yargs').argv;

const webpack = require('./src/webpack');

global.console.log = global.console.log.bind(global.console);

const options = {};
const commandArgv = argv._;

if (!commandArgv.length) {
  return;
}

options.input = path.resolve(process.cwd(), commandArgv[0]);
options.rootDir = path.dirname(options.input);

webpack(options.input, options);
