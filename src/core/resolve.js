const path = require('path');

function resolve(moduleName, options) {
  if (moduleName.startsWith('/')) {
    return moduleName
  }
  return path.resolve(options.rootDir, moduleName);
}

module.exports = resolve;
