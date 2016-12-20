'use strict';
let LogPublisher = require('./LogPublisher');

module.exports = function(loggerName='*') {
    return LogPublisher.create(loggerName);
};