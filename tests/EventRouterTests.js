'use strict';
let Logger = require('../src/Index')();
let Should = require('should');

describe('Additional event routing', function() {

    // Override default test params
    this.timeout(5000);

    it('should load successfully', function() {
        Should.exist(Logger);
        Should.exist(Logger.error);
        Should.exist(Logger.warn);
        Should.exist(Logger.info);
        Should.exist(Logger.verbose);
        Should.exist(Logger.debug);
        Should.exist(Logger.router);
    });

    it('should be able to register an additional listener on the event router', function() {
        Logger.router.once('clientId:1234', function(data) {
            console.log('Event Emitter -> Received an additional event dispatch from the router');
            console.log(data);
            Should.equal(data.message, 'Here is an event with an additional publishing requirement');
        });
    });

    it('should be able to dispatch an event to additional event listners', function() {
        Logger.info('Here is an event with an additional publishing requirement', null, 'clientId:1234');
    });

});