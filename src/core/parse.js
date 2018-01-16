const fs = require('fs');
const esprima = require('esprima');

const resolve = require('./resolve');


let nextId = 0;

function parse(moduleName, depTree, options) {

  function __parse(moduleName) {
    const filename = resolve(moduleName, options);
    const source = fs.readFileSync(filename).toString();
    const id = nextId++;

    depTree.modules[filename] = {
      id,
      filename,
      name: moduleName,
      requires: [],
      source
    };
    depTree.mapModuleNameToId[filename] = id;
    depTree.mapIdToModuleName.push(filename);

    const ast = esprima.parse(source, { range: true });
    ast.body.forEach((statement) => {
      switch (statement.type) {
        case 'VariableDeclaration':
          if (statement.declarations) {
            parseDeclarations(statement.declarations, filename)
          }
          break;
        case 'ExpressionStatement':
          parseExpression(statement.expression, filename);
          break;
        default:
          break
      }
    })
  }

  __parse(moduleName);



  function parseDeclarations(declarations, rootFilename) {
    declarations.forEach((declaration) => {
      if (declaration.type === 'VariableDeclarator' && declaration.init && declaration.init.type === 'CallExpression') {
        parseExpression(declaration.init, rootFilename)
      }
    })
  }

  function parseExpression(expression, rootFilename) {
    if (expression.callee && expression.callee.type === 'Identifier' && expression.callee.name === 'require' && expression.arguments.length) {
      const moduleName = expression.arguments[0].value;
      const filename = resolve(moduleName, options);


      if (!(filename in depTree.modules)) {
        __parse(moduleName);
      }

      depTree.modules[rootFilename].requires.push({
        id: depTree.modules[filename].id,
        range: expression.arguments[0].range
      });
    }
  }
}

module.exports = parse;
