'use strict';
let MapValues = require('lodash/mapValues');
let Purdy = require('purdy');
var Stacky = require('stacky');

describe('Alternative metadata handling', function() {

    it.skip('Use Purdy a single object with an embedded error', function() {
        let sampleObject = {
            error: new Error('Sample error'),
            hello: 'world',
            nestedHello: {
                nestedWorld: {
                    'helloNested': 'world'
                }
            }
        };

        let transformedObject = MapValues(sampleObject, (value) => {
            if(value.stack) {
                return '\n' + Stacky.pretty(value.stack, { maxMethodPadding: 15 });
            }
            return value;
        });

        console.log(Purdy.stringify(transformedObject));
    });

});