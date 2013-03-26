var PCFW = {
    version: {
        major: 0,
        minor: 0,
        patch: 0
    },
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
        CHAT:              "",
        CURATE_UPDATE:     "",
        DJ_ADVANCE:        "",
        DJ_UPDATE:         "",
        FAN_JOIN:          "",
        FRIEND_JOIN:       "",
        MOD_SKIP:          "",
        ROOM_SCORE_UPDATE: "",
        USER_FAN:          "",
        USER_JOIN:         "",
        USER_LEAVE:        "",
        USER_SKIP:         "",
        VOTE_SKIP:         "",
        VOTE_UPDATE:       "",
        WAIT_LIST_UPDATE:  "",
        on: function() {},
        once: function() {},
        off: function() {},
        emit: function() {},
        priority: {
            HIGHEST: 0,
            HIGH: 0,
            NORMAL: 0,
            LOW: 0,
            LOWEST: 0,
            SYSTEM: 0,
            MONITOR: 0
        }
    },
    gui: {
        __GUI: {
            init: function() {},
            data: function() {},
            width: function() {},
            height: function() {},
            textfield: function() {},
            toggle: function() {},
            checkbox: function() {},
            button: function() {}
        },
        new: function() {}
    }
};