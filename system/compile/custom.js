var NotImplementedError,EventEmitError,
PCFW = {
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
    GUI: {
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
    },
    room: {
        images: {
            woot: {
                normal: function() {},
                disabled: function() {},
                selected: function() {},
                popout: {
                    normal: function() {},
                    disabled: function() {},
                    selected: function() {}
                }
            },
            meh: {
                normal: function() {},
                disabled: function() {},
                selected: function() {},
                popout: {
                    normal: function() {},
                    disabled: function() {},
                    selected: function() {}
                }
            }
        },
        text: {}
    }
};
var data = {
    mention: false,
    cancelled: false
};
API = {
    __events: {},
    CHAT              : "",
    USER_SKIP         : "",
    USER_JOIN         : "",
    USER_LEAVE        : "",
    USER_FAN          : "",
    FRIEND_JOIN       : "",
    FAN_JOIN          : "",
    VOTE_UPDATE       : "",
    CURATE_UPDATE     : "",
    ROOM_SCORE_UPDATE : "",
    DJ_ADVANCE        : "",
    DJ_UPDATE         : "",
    VOTE_SKIP         : "",
    MOD_SKIP          : "",
    WAIT_LIST_UPDATE  : ""
};
Models = {
    user: {
        data: {}
    },
    room: {
        data: {}
    }
};