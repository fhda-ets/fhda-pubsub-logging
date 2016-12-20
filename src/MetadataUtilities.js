'use strict';
let MapValues = require('lodash/mapValues');
let Stacky = require('stacky');

/**
 * Defaults for using Stacky to format error stack traces
 */
const stackyDefault = {
    maxMethodPadding: 15
};

/**
 * Defaults for using Stacky to format error stack traces
 */
const stackyNoColoring = {
    maxMethodPadding: 15,
    styles: {
        method: (string) => string,
        location: (string) => string,
        line: (string) => string,
        column: (string) => string,
        unimportant: (string) => string
    }    
};

/**
 * Mapping function for Lodash.mapValues(...) that applies value transformations
 * with coloring
 */
const defaultMapperColoring = defaultMapper();

/**
 * Mapping function for Lodash.mapValues(...) that applies value transformations
 * without coloring
 */
const defaultMapperNoColoring = defaultMapper(false);

/**
 * Generate a helper function to use with Lodash.mapValues(...) to perform additional
 * transformations on certain types of values found at the first level in
 * event metdata
 * @param {Boolean} coloring True if coloring should be applied, false if not
 * @returns {any} Either a transformed value, or the original if nothing was done
 */
function defaultMapper(coloring=true) {
    return function(value) {
        if(value.stack) {
            return {
                message: value.message || undefined,
                stack: '\n' + Stacky.pretty(value.stack, (coloring) ? stackyDefault : stackyNoColoring)
            };
        }
        return value;   
    }; 
}


/**
 * Take the provided metadata object, and process it with additional value
 * transformation that can help make the data more readable when rendered
 * out through various kinds of log transports
 * @param {Object} metadata The event metadata object
 * @param {Boolean} [coloring=true] True if coloring should be applied, false if not
 * @returns {Object} Metadata with changes applied
 */
function process(metadata, coloring=true) {
    return MapValues(metadata, (coloring) ? defaultMapperColoring : defaultMapperNoColoring);
}

module.exports = {
    defaultMapper: defaultMapper,
    process: process
};