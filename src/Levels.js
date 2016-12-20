'use strict';
let Config = require('config');

if(Config.has('logging.levels')) {
    module.exports = Config.logging.levels;
}
else {
    module.exports = {
        off: { value: 0, label: 'off' },
        error: { value: -1, label: 'error' },
        warn: { value: -2, label: 'warn' },
        info: { value: -3, label: 'info' },
        verbose: { value: -4, label: 'verbose' },
        debug: { value: -5, label: 'debug' }
    };
}