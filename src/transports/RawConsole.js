'use strict';
let PackageDebug = require('../PackageDebug');
let Util = require('util');

module.exports = function() {

    PackageDebug.log('Completed configuration of raw console transport');

    return function(data) {
        // Is there metadata associated with the event?
        if(data.metadata) {
            process
                .stderr
                .write(Util.format(data.message, ...data.metadata));
        }
        else {
            // Write only the message to stdout
            process.stderr.write(`${data.message}\n`);
        }

        // Return payload for transport chaining
        return data;
    };

};