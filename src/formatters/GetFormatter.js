'use strict';

module.exports = function(name, defaultsTo) {
    switch(name) {
        case 'pretty': return require('./Pretty');
        case 'pretty-nocolors': return require('./PrettyWithoutColor');
        default: 
            if(name)
                return require(name);
            else
                return require(defaultsTo);
    }
};