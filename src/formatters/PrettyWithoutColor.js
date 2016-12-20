'use strict';
let MetadataUtilities = require('../MetadataUtilities');
let Purdy = require('purdy');
let SpeedDate = require('speed-date');

/**
 * Default timestamp format for Speed Date if an alternative is provided
 * by the developer
 */
const defaultTimeFormat = 'MM-DD-YYYY hh:mm:ss A';

/**
 * Defaults for using Purdy to format objects
 */
const purdyDefaults = { plain: true };

/**
 * Format an event, typically into a final string, suitable to be rendered
 * by a logging transport
 * @param {Object} transportConfig Config object for the transport
 * @param {Object} data Event data payload
 * @returns {any} A formatted event
 */
function format(transportConfig, data) {
    // Format the event timestamp
    let event = SpeedDate.cached(
        transportConfig.timestampFormat || defaultTimeFormat,
        data.timestamp);

    // Append logger level
    if(data.level) {
        event += ` (${data.level})`;
    }

    // Append logger label if it is not the root
    if(data.label && data.label !== '*') {
        event += ` (${data.label})`;
    }

    // Append the event message
    event += ` ${data.message} `;

    // If metadata is provided, perform post-processing without coloring\
    // to format specific property types such as errors
    if(data.metadata) {
        let processedMetadata = MetadataUtilities.process(data.metadata, false);
        event += Purdy.stringify(processedMetadata, purdyDefaults);
    }

    // Return formatted message
    return event;
}

module.exports = {
    format: format
};