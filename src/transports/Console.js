'use strict';
let GetFormatter = require('../formatters/GetFormatter');
let PackageDebug = require('../PackageDebug');

module.exports = function(transportConfig) {
    // Lookup formatter (defaults to Pretty)
    let formatter = GetFormatter(transportConfig.formatter, './Pretty');

    PackageDebug.log('Completed configuration of console transport');

    return function(data) {
        // Run the message through the formatter
        let formattedMessage = formatter.format(transportConfig, data);

        // Write to stdout
        process.stderr.write(`${formattedMessage}\n`);

        // Return payload for transport chaining
        return data;
    };
};