//Generated at 04-03-2013 02:08:35
var _PCFW = Class.extend({
    __original: {},
    version: {
        major: 0,
        minor: 1,
        patch: 1
    },
    getVersion: function() {
        return this.version.major + '.' + this.version.minor + '.' + this.version.patch;
    },
    init: function() {
        this.__original.chatCommand = Models.chat.chatCommand;
        this.__original.delayDispatch = API.delayDispatch;
        API.delayDispatch = function(a,b) {
            this.isReady && this.__events[a] && PCFW.events.emit(a,b), setTimeout(function(){API.dispatchEvent(a,b);a=b=null},1E3);
        };

        log('PCFW version ' + this.getVersion() + ' initialized');
    },
    kill: function() {
        Models.chat.chatCommand = PCFW.__original.chatCommand;
        API.delayDispatch = PCFW.__original.delayDispatch;
    }
});
_PCFW.commands = {
    __commands: {},
    add: function(command,callback) {
        if (command === undefined || command.toString().length < 1 || callback === undefined || this.__commands[command.toString()] !== undefined) return false;
        return this.__commands[command.toString()] = callback,true;
    },
    remove: function(command) {
        if (command === undefined || this.__commands[command.toString()] === undefined) return false;
        return delete this.__commands[command.toString()],true;
    },
    isset: function(command) {
        if (command === undefined) return false;
        return this.__commands[command.toString()] !== undefined;
    }
};
_PCFW.events = {
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
        if (type === undefined || callback === undefined) return false;
        if (this.__events[type] === undefined) this.__events[type] = [];
        if (priority === undefined) priority = this.priority.NORMAL;
        else {
            var a = false;
            for (var b in this.priority) {
                if (this.priority[b] === priority)
                    a = true;
            }
            if (!a) priority = this.priority.NORMAL;
        }
        this.__events[type].push({
            callback: callback,
            once:     false,
            priority: priority
        });
        this.__events[type].sort(this.prioritySort);
        return true;
    },
    once: function(type,callback,priority) {
        if (type === undefined || callback === undefined) return false;
        if (this.__events[type] === undefined) this.__events[type] = [];
        if (priority === undefined) priority = this.priority.NORMAL;
        this.__events[type].push({
            callback: callback,
            once:     true,
            priority: priority
        });
        this.__events[type].sort(this.prioritySort);
        return true;
    },
    off: function(type,callback) {
        if (type === undefined || callback === undefined) return false;
        if (this.__events[type] === undefined) return false;
        var found = false;
        for (var i in this.__events[type]) {
            if (this.__events[type][i].callback === callback) {
                this.__events[type].splice(i,1);
                found = true;
            }
        }
        return found;
    },
    emit: function(type,data) {
        if (type === undefined || data === undefined) return false;
        if (this.__events[type] === undefined) return true;
        for (var i in this.__events[type]) {
            try {
                if (this.__events[type][i] === undefined || this.__events[type][i].callback === undefined)
                    this.__events[type].splice(i,1);
                else
                    this.__events[type][i].callback(data);

                if (this.__events[type][i].once)
                    this.__events[type].splice(i,1);
            } catch (e) {
                console.error('emit',{error:e,type:type,data:data});
            }
        }
        return true;
    }
};
PCFW = new _PCFW();