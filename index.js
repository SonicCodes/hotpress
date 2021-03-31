const {Express} = require("express")
const {
    performance
} = require('perf_hooks');
const fs = require("fs")
const express = require("express");
let router = null;
let wasError = false;
let reload = function() {
    throw "You haven't initialized HotPress yet.";
}


/**
 * @param {Object} config
 * @param {string} config.reloadable - the file that's going to be hot reloaded (i.e ./foo.js).
 * @param {Express} config.server - a pre initialized server
 * @param {function():void} config.preload - to let you do things before loading the app, i.e (clear mongoose models)
 * @param {function():void} config.postload - to let you do things after the app is successfully loaded.
 * @param {function(e:Error):void} config.error - to notify you of an error with what happened.
 * @param {any} params - parameters that'll be passed to your initializer.
 *
 * - ./foo.js - your hot reloadable server.
 *  ```
 *  /**
 *  \@param server : Router
 *  **\/
 *  function reload(server, ...params) {
 *      // Anything you do normally
 *  }
 *  modules.export = reload
 *  ```
 *
 *  - ./server.js - your good old friend.
 *  ```
 *  const express = require("express")
 *  const {setup,reload} = require("@soniccodes/hotpress")
 *  const app = express()
 *  setup("./foo.js",app)
 *  app.listen(**)
 *  ```
 */
function setup(config, ...params){
    config.server.use((req,res,next)=>{
        if(router != null) {
            router(req, res, next)
        }
    })
    reload = function() {
        const start = performance.now();
        try{
            if(config.preload != null) config.preload()
            router = null;
            router = express.Router();
            delete require.cache[require.resolve(config.reloadable)]
            const reloaded = require(config.reloadable)
            reloaded(router,...params)
            const end = performance.now();
            if(wasError){
                console.log(`🎉 The last error was recovered in ${Math.round(end - start)}ms..`)
            }else{
                console.log(`⚡ Reloaded your server in ${Math.round(end - start)}ms.`)
            }
            wasError = false;
            if(config.postload != null) config.postload()
        }catch (e) {
            wasError = true;
            const end = performance.now();
            console.log(`💀 Something went wrong in ${Math.round(end - start)}ms.`)
            console.log(e.stack)
            if(config.error != null) config.error(e)
        }
    }
    fs.watchFile(config.reloadable,{interval:100},()=>{
        reload();
    })
    reload()
}

module.exports = {setup, reload}



