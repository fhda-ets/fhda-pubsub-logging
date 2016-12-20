'use strict';
let Config = require('config');
let Flow = require('lodash/flow');
let Levels = require('./Levels');
let TransformObject = require('lodash/transform');
let EventEmitter = require('eventemitter3');
let PackageDebug = require('./PackageDebug');

// Create central event emitter
let emitter = new EventEmitter();

// Get the root logger level
let rootLevel = Levels[Config.logging.level].value;

// Load transport modules
let transports = loadTransports();

// Create chained transport for dispatching events to transports
let transportsFn = Flow(...transports);

// Attach global event handler
emitter.on('event', function(data) {
    if(Levels[data.level].value >= rootLevel) {
        // Generate a timestamp to share across transports
        data.timestamp = new Date();

        // Dispatch event to transports
        transportsFn(data);
    }
});

function loadTransports() {
    PackageDebug.log('Loading logging transports');

    // Iterate each configured transport and load its related module
    // (modules that cannot be found are reported and skipped)
    return TransformObject(Config.logging.transports, (result, configuration, transportType) => {
        PackageDebug.log(`Attempting to load transport '${transportType}'`);

        // Skip transports with a non-truthy configuration
        if(!(configuration)) {
            return result;
        }

        if(transportType === 'console') {
            result.push(require('./transports/Console')(configuration));
            PackageDebug.log(`Loaded transport 'console'`);
        }
        else if(transportType === 'rawConsole') {
            result.push(require('./transports/RawConsole')(configuration));
            PackageDebug.log(`Loaded transport 'rawConsole'`);
        }
        else if(transportType === 'rotatingFile') {
            result.push(require('./transports/RotatingFile')(configuration));
            PackageDebug.log(`Loaded transport 'rotatingFile'`);
        }
        else if(transportType === 'splunk') {
            result.push(require('./transports/Splunk')(configuration));
            PackageDebug.log(`Loaded transport 'splunk'`);
        }
        else {
            PackageDebug.error(`Transport '${transportType}' is not available`);
        }

        return result;
    }, []);
}

module.exports = emitter;