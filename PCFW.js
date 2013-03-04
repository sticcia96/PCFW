//Generated at 04-03-2013 13:18:03
var PCFW = {
    __original: {},
    version: {
        major: 0,
        minor: 1,
        patch: 2
    },
    getVersion: function() {
        return PCFW.version.major + '.' + PCFW.version.minor + '.' + PCFW.version.patch;
    },
    init: function() {
        if (document.location.host !== 'plug.dj') return;
        PCFW.__original.chatCommand = Models.chat.chatCommand;
        PCFW.__original.delayDispatch = API.delayDispatch;
        API.delayDispatch = function(a,b) {
            if (!API.isReady) return;
            PCFW.events.emit(a,b);
            API.__events[a] && setTimeout(function(){API.dispatchEvent(a,b);a=b=null},1E3);
        };

        log('PCFW version ' + PCFW.getVersion() + ' initialized');
    },
    kill: function() {
        Models.chat.chatCommand = PCFW.__original.chatCommand;
        API.delayDispatch = PCFW.__original.delayDispatch;
    },
    loadScript: function(script) {
        if (typeof script === 'string') {
            if (script.indexOf('http://') === 0 || script.indexOf('https://') === 0 || (script.indexOf('chrome-extension://') === 0 && $.browser.chrome)) {
                //TODO: Load script from URL
            } else throw new Error("Illegal URL");
        } else if (Object.prototype.toString.call(script) === '[object Object]') {
            //TODO: Load script from object ( http://pastebin.com/raw.php?i=39436vdE )
        }
    }
};
PCFW.console = {
    log: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.log.apply(console, msgs);
    },
    error: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.error.apply(console, msgs);
    },
    trace: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.trace.apply(console, msgs);
    },
    info: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.info.apply(console, msgs);
    },
    warn: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.warn.apply(console, msgs);
    },
    assert: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.assert.apply(console, msgs);
    }
};
PCFW.commands = {
    __commands: {},
    add: function(command,callback) {
        if (command === undefined || command.toString().length < 1 || callback === undefined || PCFW.commands.__commands[command.toString()] !== undefined) return false;
        return PCFW.commands.__commands[command.toString()] = callback,true;
    },
    remove: function(command) {
        if (command === undefined || PCFW.commands.__commands[command.toString()] === undefined) return false;
        return delete PCFW.commands.__commands[command.toString()],true;
    },
    isset: function(command) {
        if (command === undefined) return false;
        return PCFW.commands.__commands[command.toString()] !== undefined;
    }
};
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
        if (type === undefined || callback === undefined) return false;
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
        if (type === undefined || callback === undefined) return false;
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
        if (type === undefined || callback === undefined) return false;
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
        if (type === undefined || data === undefined) return false;
        if (PCFW.events.__events[type] === undefined) return true;
        for (var i in PCFW.events.__events[type]) {
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
PCFW.init();