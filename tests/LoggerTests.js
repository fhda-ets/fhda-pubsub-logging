'use strict';
let Delay = require('delay');
let Logger = require('../src/Index')();
let Logger2 = require('../src/Index')('logger2');
let Logger3 = require('../src/Index')('logger3');
let Should = require('should');

describe('Named logger', function() {

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

    it('should deliver an ERROR event with metadata', function() {
        let sampleError = new Error('Here is a sample error to test stacktrace formatting');
        let sampleErrorWithoutDesc = new Error();

        Logger.error('Sample event at the error level', {
            error: sampleError,
            hello: 'world',
            world: 'hello'});

        Logger.error('Sample event (with an description-less error object) at the error level', {
            error: sampleErrorWithoutDesc,
            hello: 'world',
            world: 'hello'});

        Logger2.error('Sample event at the error level', {
            error: sampleError,
            hello: 'world',
            world: 'hello',
            deeply: {
                nested: {
                    hello: 'nestedWorld'
                }
            }
        });

        Logger3.error('Sample event at the error level', {
            error: sampleError,
            hello: 'world',
            world: 'hello'
        });

        return Delay(2000);
    });

    it('should deliver an ERROR event without metadata', function() {
        Logger.error('Sample event at the error level');
        Logger2.error('Sample event at the error level');
        Logger3.error('Sample event at the error level');
        return Delay(2000);
    });

    it('should deliver an WARN event with metadata', function() {
        Logger.warn('Sample event at the warn level', {
            hello: 'world',
            world: 'hello'
        });

        Logger2.warn('Sample event at the warn level', {
            hello: 'world',
            world: 'hello',
            deeply: {
                nested: {
                    hello: 'nestedWorld'
                }
            }
        });

        Logger3.warn('Sample event at the warn level', {
            hello: 'world',
            world: 'hello'
        });

        return Delay(2000);
    });

    it('should deliver an WARN event without metadata', function() {
        Logger.warn('Sample event at the warn level');
        Logger2.warn('Sample event at the warn level');
        Logger3.warn('Sample event at the warn level');
        return Delay(2000);
    });

    it('should deliver an INFO event with metadata', function() {
        Logger.info('Sample event at the info level', {
            hello: 'world',
            world: 'hello'
        });

        Logger2.info('Sample event at the info level', {
            hello: 'world',
            world: 'hello',
            deeply: {
                nested: {
                    hello: 'nestedWorld'
                }
            }
        });

        Logger3.info('Sample event at the info level', {
            hello: 'world',
            world: 'hello'
        });

        return Delay(2000);
    });

    it('should deliver an INFO event without metadata', function() {
        Logger.info('Sample event at the info level');
        Logger2.info('Sample event at the info level');
        Logger3.info('Sample event at the info level');
        return Delay(2000);
    });

    it('should deliver an VERBOSE event with metadata', function() {
        Logger.verbose('Sample event at the verbose level', {
            hello: 'world',
            world: 'hello'
        });

        Logger2.verbose('Sample event at the verbose level', {
            hello: 'world',
            world: 'hello',
            deeply: {
                nested: {
                    hello: 'nestedWorld'
                }
            }
        });

        Logger3.verbose('Sample event at the verbose level', {
            hello: 'world',
            world: 'hello'
        });

        return Delay(2000);
    });

    it('should deliver an DEBUG event with metadata', function() {
        Logger.debug('Sample event at the debug level', {
            hello: 'world',
            world: 'hello'
        });

        Logger2.debug('Sample event at the debug level', {
            hello: 'world',
            world: 'hello',
            deeply: {
                nested: {
                    hello: 'nestedWorld'
                }
            }
        });

        Logger3.debug('Sample event at the debug level', {
            hello: 'world',
            world: 'hello'
        });

        return Delay(2000);
    });

});