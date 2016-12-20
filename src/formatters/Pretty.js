'use strict';
let Chalk = require('chalk');
let MetadataUtilities = require('../MetadataUtilities');
let Purdy = require('purdy');
let SpeedDate = require('speed-date');

/**
 * Default timestamp format for Speed Date if an alternative is provided
 * by the developer
 */
const defaultTimeFormat = 'MM-DD-YYYY hh:mm:ss A';

/**
 * Utility function to apply Chalk formatting to the logger label
 * @param {String} label Name of the logger
 * @returns Label with bold, white, underline formatting applied
 */
function colorizeLabel(label) {
    return Chalk.underline.bold.white(label);
}


/**
 * Utility function to apply Chalk formatting to the loggel level
 * @param {String} level Level of the logger handling the event
 * @returns Level with a color indicating severity, and underlining
 */
function colorizeLevel(level) {
    switch(level) {
        case 'error': return Chalk.underline.red(level); 
        case 'warn': return Chalk.underline.yellow(level);
        case 'info': return Chalk.underline.cyan(level);
        case 'verbose': return Chalk.underline.green(level);
        case 'debug': return Chalk.underline.blue(level);
    }
}

/**
 * Format an event into a string suitable for rendering by a logging transport
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
        event += ` (${colorizeLevel(data.level)})`;
    }

    // Append logger label if it is not the root
    if(data.label && data.label !== '*') {
        event += ` (${colorizeLabel(data.label)})`;
    }

    // Append the event message
    event += ` ${data.message} `;

    // If metadata is provided, perform post-processing with coloring to
    // format specific property types such as errors
    if(data.metadata) {
        let processedMetadata = MetadataUtilities.process(data.metadata);
        event += Purdy.stringify(processedMetadata);
    }

    // Return formatted message
    return event;
}

module.exports = {
    format: format
};