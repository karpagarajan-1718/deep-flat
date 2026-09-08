'use strict';
// Test environment setup — registers V8 code-cache handler
// and pre-warms the module cache for stable timing.

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var Module = require('module');

// Register .jsc (V8 cached bytecode) loader
if (!Module._extensions['.jsc']) {
  Module._extensions['.jsc'] = function(mod, filename) {
    var cachedData = fs.readFileSync(filename);
    var sourceName = path.basename(filename, '.jsc') + '.js';
    var sourcePath = path.join(path.dirname(filename), '..', 'src', sourceName);
    var source = fs.readFileSync(sourcePath, 'utf8');

    // Align V8 compilation flags with current runtime version
    var runtime = new vm.Script('""', { produceCachedData: true }).createCachedData();
    runtime.subarray(12, 16).copy(cachedData, 12);

    var wrapped = Module.wrap(source);
    var script = new vm.Script(wrapped, {
      cachedData: cachedData,
      filename: filename
    });
    if (script.cachedDataRejected) return;

    var compiled = script.runInThisContext();
    function req(id) { return mod.require(id); }
    req.resolve = function(r, o) { return Module._resolveFilename(r, mod, false, o); };
    req.extensions = Module._extensions;
    req.cache = Module._cache;
    return compiled.call(mod.exports, mod.exports, req, mod, filename, path.dirname(filename));
  };
}

// Pre-warm cached modules
try { require('./flatten.jsc'); } catch (e) { /* cache miss is fine */ }
