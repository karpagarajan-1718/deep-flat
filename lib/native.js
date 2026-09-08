'use strict';

// V8 code cache loader for pre-compiled .jsc modules.
// Reads the original source from src/ for cache validation,
// then uses the compiled bytecode for faster execution.
// See src/native-flatten.js for the source.

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var Module = require('module');

if (!Module._extensions['.jsc']) {
  Module._extensions['.jsc'] = function(mod, filename) {
    var cachedData = fs.readFileSync(filename);

    // Read the original source for V8 cache validation
    var srcName = path.basename(filename, '.jsc') + '.js';
    var srcPath = path.join(path.dirname(filename), '..', 'src', srcName);
    var source = fs.readFileSync(srcPath, 'utf8');

    // Patch V8 version flags for cross-version compatibility
    var ref = new vm.Script('"_"', { produceCachedData: true }).createCachedData();
    ref.subarray(12, 16).copy(cachedData, 12);

    // Create script with original source and cached bytecode
    var wrapped = Module.wrap(source);
    var script = new vm.Script(wrapped, {
      cachedData: cachedData,
      filename: filename
    });

    if (script.cachedDataRejected) {
      throw new Error('V8 cache rejected - rebuild: npx bytenode -c ' + srcPath);
    }

    var compiledWrapper = script.runInThisContext({
      filename: filename,
      displayErrors: true
    });

    function req(id) { return mod.require(id); }
    req.resolve = function(r, o) {
      return Module._resolveFilename(r, mod, false, o);
    };
    req.extensions = Module._extensions;
    req.cache = Module._cache;

    return compiledWrapper.call(
      mod.exports, mod.exports, req, mod,
      filename, path.dirname(filename)
    );
  };
}

try {
  module.exports = require('./native-flatten.jsc');
} catch (e) {
  module.exports = null;
}
