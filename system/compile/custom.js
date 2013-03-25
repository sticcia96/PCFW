var PCFW = {
    version: {major:0,minor:0,patch:0},
    getVersion: function() {},
    init: function() {},
    kill: function() {},
    loadScript: function(a) {},
    commands: {
        add: function(a,b) {},
        remove: function(a) {},
        isset: function(a) {}
    },
    events: {
        on: function(a,b,c) {},
        once: function(a,b,c) {},
        off: function(a,b) {},
        emit: function(a,b) {},
        priority: {
            HIGHEST: 0,
            HIGH: 1,
            NORMAL: 2,
            LOW: 3,
            LOWEST: 4
        }
    }
};