PCFW.events = {
    CHAT:              "chat",
    CURATE_UPDATE:     "curateUpdate",
    DJ_ADVANCE:        "djAdvance",
    DJ_UPDATE:         "djUpdate",
    FAN_JOIN:          "fanJoin",
    FRIEND_JOIN:       "friendJoin",
    MOD_SKIP:          "modSkip",
    ROOM_SCORE_UPDATE: "roomScoreUpdate",
    USER_FAN:          "userFan",
    USER_JOIN:         "userJoin",
    USER_LEAVE:        "userLeave",
    USER_SKIP:         "userSkip",
    VOTE_SKIP:         "voteSkip",
    VOTE_UPDATE:       "voteUpdate",
    WAIT_LIST_UPDATE:  "waitListUpdate",
    __events: {},
    __prioritySort: function(a,b) { return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0; },
    priority: {
        HIGHEST: 0,
        HIGH:    1,
        NORMAL:  2,
        LOW:     3,
        LOWEST:  4,
        SYSTEM:  5,
        MONITOR: 6
    },
    on: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) PCFW.events.__events[type] = [];
        if (priority === undefined) priority = PCFW.events.priority.NORMAL;
        else {
            var a = false;
            for (var b in PCFW.events.priority) {
                if (PCFW.events.priority[b] === priority)
                    a = true;
            }
            if (!a) priority = PCFW.events.priority.NORMAL;
        }
        PCFW.events.__events[type].push({
            callback: callback,
            once:     false,
            priority: priority
        });
        PCFW.events.__events[type].sort(PCFW.events.prioritySort);
        return true;
    },
    once: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) PCFW.events.__events[type] = [];
        if (priority === undefined) priority = PCFW.events.priority.NORMAL;
        PCFW.events.__events[type].push({
            callback: callback,
            once:     true,
            priority: priority
        });
        PCFW.events.__events[type].sort(PCFW.events.prioritySort);
        return true;
    },
    off: function(type,callback) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) return false;
        var found = false;
        for (var i in PCFW.events.__events[type]) {
            if (PCFW.events.__events[type][i].callback === callback) {
                PCFW.events.__events[type].splice(i,1);
                found = true;
            }
        }
        return found;
    },
    emit: function(type,data) {
        if (type === undefined || type === null || data === undefined || data === null) return false;
        if (PCFW.events.__events[type] === undefined) return true;
        for (var i in PCFW.events.__events[type]) {
            if (typeof data.cancelled !== "undefined" && data.cancelled === true && PCFW.events.__events[type][i].priority < PCFW.events.priority.MONITOR)
                return;
            try {
                if (PCFW.events.__events[type][i] === undefined || PCFW.events.__events[type][i].callback === undefined)
                    PCFW.events.__events[type].splice(i,1);
                else
                    PCFW.events.__events[type][i].callback(data);

                if (PCFW.events.__events[type][i].once)
                    PCFW.events.__events[type].splice(i,1);
            } catch (e) {
                PCFW.console.error('emit',{error:e,type:type,data:data});
            }
        }
        return true;
    }
};