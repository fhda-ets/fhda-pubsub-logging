'use strict';
let Config = require('config');
let Hyperquest = require('hyperquest');
let MetadataUtilities = require('../MetadataUtilities');
let PackageDebug = require('../PackageDebug');

module.exports = function(transportConfig) {

    PackageDebug.log('Completed configuration of splunk transport');

    // Create config object for HTTP requests
    let httpRequestConfig = {
        headers: {
            'Authorization': `Splunk ${transportConfig.collectorAuthKey}`
        }
    };

    return function(data) {
        // If metadata is provided, perform processing to extract readable properties,
        // and seperate properties from a runtime error if discovered
        if(data.metadata) {
            var meta = MetadataUtilities.process(data.metadata, false);
        }

        // Convert the event to JSON
        let jsonPayload = JSON.stringify({
            time: data.timestamp / 1000,
            source: Config.logging.source,
            event: Object.assign({
                environment: Config.logging.environment,
                label: data.label,
                level: data.level,
                message: data.message   
            }, meta)
        });

        // Create a request to Splunk
        let request = Hyperquest.post(transportConfig.uri, httpRequestConfig, handleHttpResponse);

        // Write the JSON graph, and close the stream
        request.end(jsonPayload, 'utf8');

        // Return payload for transport chaining
        return data;
    };

};

function handleHttpResponse(error, response) {
    if(error) {
        PackageDebug.error(`Splunk transport encountered an error\n${error}`);    
    }
    else {
        if(response.statusCode !== 200) {
            PackageDebug.error(`Splunk responded error ${response.statusCode} to last event delivery`);
        }
    }
}