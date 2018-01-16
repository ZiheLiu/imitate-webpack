const a = require('./a.js');var b = require('./b.js');
require('./b.js');

console.log('index');
a();
b();
