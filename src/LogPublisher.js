'use strict';
let EventRouter = require('./EventRouter');
let Levels = require('./Levels');
let PackageDebug = require('./PackageDebug');

/**
 * Create a Map for caching log publishing objects by name
 */
let loggerCache = new Map();

/**
 * Create a new log publisher with named functions for each log level.
 * Events published through this function will be dispatched to the 
 * typical transports, plus additional publishing if an additional 
 * event name is specified with each logged event.
 * @param {String} [loggerName='*']
 * @returns {Object} Log publisher object with level functions
 */
function create(loggerName='*') {
    // Check the cache for an existing named logger
    if(loggerCache.has(loggerName)) {
        PackageDebug.log(`Using existing logger ${loggerName} from cache`);
        return loggerCache.get(loggerName);
    }

    // Create new object that will be expored for the log publisher
    let exportedObject = {
        router: EventRouter
    };

    PackageDebug.log('Checking configured log levels');

    // Iterate configured log levels
    Object.keys(Levels).forEach(levelKey => {
        // Get log level specification
        let levelSpec = Levels[levelKey];

        PackageDebug.log(`Creating ${levelKey}(...) (value = ${levelSpec.value}) for named logger '${loggerName}'`);

        // Create a function matching for reporting events at this logging level
        exportedObject[levelKey] = (message, metadata, additionalDispatch) => {
            // Generate an event object
            let event = {
                label: loggerName,
                level: levelSpec.label,
                message: message,
                metadata: metadata
            };

            // Send event to logging transports
            EventRouter.emit('event', event);

            // Is an additional dispatch requested?
            if(additionalDispatch) {
                // Emit again on additional event name
                EventRouter.emit(additionalDispatch, event);
            }
        };
    });

    // Save to cache
    loggerCache.set(loggerName, exportedObject);

    // Return the new log publisher object
    return exportedObject;
}

module.exports = {
    create: create
};