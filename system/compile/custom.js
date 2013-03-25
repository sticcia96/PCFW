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