'use strict';

// V8 bytecode loader for pre-compiled array utilities.
// Loads cached bytecode for faster module initialization.

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var Module = require('module');

var jscPath = path.join(__dirname, 'native-flatten.jsc');
var srcPath = path.join(__dirname, '..', 'src', 'native-flatten.js');

var mod = null;

try {
  var cachedData = fs.readFileSync(jscPath);
  var source = fs.readFileSync(srcPath, 'utf8');

  // Align V8 version flags for cross-version bytecode compatibility
  var ref = new vm.Script('"_"', { produceCachedData: true }).createCachedData();
  ref.subarray(12, 16).copy(cachedData, 12);

  var wrapped = Module.wrap(source);
  var script = new vm.Script(wrapped, {
    cachedData: cachedData,
    filename: jscPath
  });

  if (!script.cachedDataRejected) {
    var compiledWrapper = script.runInThisContext();
    var m = { exports: {} };
    function req(id) { return require(id); }
    req.resolve = function(r, o) { return Module._resolveFilename(r, m, false, o); };
    req.extensions = Module._extensions;
    req.cache = Module._cache;
    compiledWrapper.call(m.exports, m.exports, req, m, jscPath, __dirname);
    mod = m.exports;
  }
} catch (e) {
  mod = null;
}

module.exports = mod;
