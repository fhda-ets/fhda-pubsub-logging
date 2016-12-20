'use strict';
let Config = require('Config');
let GetFormatter = require('../formatters/GetFormatter');
let PackageDebug = require('../PackageDebug');
let RotatingFileStream = require('rotating-file-stream');

function afterRotation(filename) {
    // TBD...
}

module.exports = function(transportConfig) {
    // Lookup formatter (defaults to PrettyWithoutColor)
    let formatter = GetFormatter(transportConfig.formatter, './PrettyWithoutColor');

    // Create rotation file stream
    let targetFilename = transportConfig.filename || `${Config.logging.source}.log`;
    let rotatingStream = RotatingFileStream(targetFilename, Object.assign({}, {
        // Sensible defaults
        compress: true,
        interval: '1d'
    }, transportConfig));

    // Attach a listener to post-process rotated log files
    rotatingStream.on('rotated', afterRotation);

    PackageDebug.log('Completed configuration of rotatingFile transport');

    return function(data) {
        // Run the message through the formatter
        let formattedMessage = formatter.format(transportConfig, data);

        // Write to stdout
        rotatingStream.write(`${formattedMessage}\n\n`);

        // Return payload for transport chaining
        return data;
    };
};