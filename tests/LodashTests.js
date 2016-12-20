'use strict';
let Lodash = require('Lodash');

describe('Lodash utilities', function() {

    it.skip('Iterating objects as keys and values', function() {
        let sampleObject = {
            console: 'pretty',
            rollingFile: 'compact',
            splunk: true
        };

        Lodash.transform(sampleObject, function(result, value, key) {
            if(Lodash.isString(value)) {
                console.log(`${key} -> ${value}`);
            }            
            else {
                console.log(`${key} does not refer to a formatter name`);
            }
        }, []);
    });

});