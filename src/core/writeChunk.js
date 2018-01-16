const fs = require('fs');
const path = require('path');

function writeChunk(depTree) {
  const headerTemplate = fs.readFileSync(path.resolve(__dirname, './headerTemplate.js')).toString();

  const body = [];
  depTree.mapIdToModuleName.forEach((filename, index) => {
    const module = depTree.modules[filename];

    let source = module.source;
    let lastEnd = 0;
    const sourceArray = [];

    if (module.requires.length) {
      module.requires.forEach((_require) => {
        const range = _require.range;
        sourceArray.push(source.slice(lastEnd, range[0]));
        sourceArray.push(`/*${source.slice(range[0], range[1])}*/${_require.id}`);
        lastEnd = range[1];
      });
      sourceArray.push(source.slice(lastEnd, source.length));
      source = sourceArray.join('');
    }

    body.push(`/******/${index}: function(module, exports, require) {\n${source}\n/******/},\n/******/\n`)
  });

  return (
    `${headerTemplate}\n/******/({\n${body.join('')}\n/******/\n/******/})\n`
  );
}

module.exports = writeChunk;
