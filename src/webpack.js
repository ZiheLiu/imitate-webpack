const fs = require('fs');
const path = require('path');

const parse = require('./core/parse');
const writeChunk = require('./core/writeChunk');

function webpack(entryModuleName, options) {
  const depTree = buildDependecyTree(entryModuleName, options);

  const chunk = writeChunk(depTree);

  fs.writeFile(path.resolve(options.rootDir, 'output.js'), chunk, 'utf-8', function (err) {
    if (err) {
      throw err;
    }
  });

  console.log(JSON.stringify(depTree))
}

function buildDependecyTree(entryModuleName, options) {
  const depTree = {
    modules: {},
    mapModuleNameToId: {},
    mapIdToModuleName: []
  };

  parse(entryModuleName, depTree, options);

  return depTree;
}

module.exports = webpack;
