//Generated at 28-03-2013 00:14:34 
/**
 * @this {NotImplementedError}
 */
function NotImplementedError(message) {
    this.name = "NotImplementedError";
    this.message = (message || "");
}
NotImplementedError.prototype = Error.prototype;

if (typeof PCFW !== "undefined") PCFW.kill();

var PCFW = {
    __original: {},
    version: {
        major: 0,
        minor: 5,
        patch: 0
    },
    getVersion: function() {
        return PCFW.version.major + '.' + PCFW.version.minor + '.' + PCFW.version.patch;
    },
    init: function() {
        if (document.location.host !== 'plug.dj') return;

        console.group('Plug.dj Coding FrameWork');

        PCFW.override.init();
        console.log('\
     _/_/_/      _/_/_/  _/_/_/_/  _/          _/\n\
    _/    _/  _/        _/        _/          _/ \n\
   _/_/_/    _/        _/_/_/    _/    _/    _/  \n\
  _/        _/        _/          _/  _/  _/     \n\
 _/          _/_/_/  _/            _/  _/        ');
        PCFW.console.log('Version ' + PCFW.getVersion() + ' initialized');

        console.groupEnd();
    },
    kill: function() {
        PCFW.override.kill();
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
    defaultMessage: function() {
        return ["[PCFW]"];
    },
    log: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.log.apply(console, msgs);
    },
    error: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.error.apply(console, msgs);
    },
    trace: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.trace.apply(console, msgs);
    },
    info: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.info.apply(console, msgs);
    },
    warn: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.warn.apply(console, msgs);
    },
    assert: function() {
        var msgs = PCFW.console.defaultMessage();
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.assert.apply(console, msgs);
    }
}; 
PCFW.commands = {
    __commands: {},
    add: function(command,callback) {
        if (command !== undefined) command = command.toString();
        if (command === undefined || command.length < 1 || command.indexOf(' ') > -1 || callback === undefined || PCFW.commands.isset(command) === true) return false;
        return PCFW.commands.__commands[command.toString()] = callback,true;
    },
    remove: function(command) {
        if (command === undefined || PCFW.commands.__commands[command.toString()] === undefined) return false;
        return delete PCFW.commands.__commands[command.toString()],true;
    },
    isset: function(command) {
        if (command === undefined) return false;
        return PCFW.commands.__commands[command.toString()] !== undefined;
    },
    execute: function(command,data) {
        if (PCFW.commands.isset(command) === false) return false;
        PCFW.commands.__commands[command.toString()](data);
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
        PCFW.events.__events[type].sort(PCFW.events.__prioritySort);
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
        PCFW.events.__events[type].sort(PCFW.events.__prioritySort);
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
PCFW.GUI = {
    __GUI: Class.extend({
        /**
         * @this {__GUI}
         */
        init: function() {
            this.__data = {};
            return this;
        },
        /**
         * @this {__GUI}
         */
        data: function(setting,value) {
            if (value === undefined) return this.__data[setting];
            this.__data[setting] = value;
            return this;
        },
        /**
         * @this {__GUI}
         */
        width: function(width) {
            return this.data('width',width);
        },
        /**
         * @this {__GUI}
         */
        height: function(height) {
            return this.data('height',height);
        },
        /**
         * @this {__GUI}
         */
        textfield: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        toggle: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        checkbox: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        button: function() {
            throw new NotImplementedError();
        }
    }),
    new: function() {
        return new PCFW.GUI.__GUI();
    }
}; 
PCFW.room = {
    images: {
        woot: {
            normal: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositive;
                Lang.ui.buttonVotePositive = url;
            },
            disabled: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositiveDisabled;
                Lang.ui.buttonVotePositiveDisabled = url;
            },
            selected: function(url) {
                if (url === undefined) return Lang.ui.buttonVotePositiveSelected;
                Lang.ui.buttonVotePositiveSelected = url;
            },
            popout: {
                normal: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositivePopout;
                    Lang.ui.buttonVotePositivePopout = url;
                },
                disabled: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositiveDisabledPopout;
                    Lang.ui.buttonVotePositiveDisabledPopout = url;
                },
                selected: function(url) {
                    if (url === undefined) return Lang.ui.buttonVotePositiveSelectedPopout;
                    Lang.ui.buttonVotePositiveSelectedPopout = url;
                }
            }
        },
        meh: {
            normal: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegative;
                Lang.ui.buttonVoteNegative = url;
            },
            disabled: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegativeDisabled;
                Lang.ui.buttonVoteNegativeDisabled = url;
            },
            selected: function(url) {
                if (url === undefined) return Lang.ui.buttonVoteNegativeSelected;
                Lang.ui.buttonVoteNegativeSelected = url;
            },
            popout: {
                normal: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativePopout;
                    Lang.ui.buttonVoteNegativePopout = url;
                },
                disabled: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativeDisabledPopout;
                    Lang.ui.buttonVoteNegativeDisabledPopout = url;
                },
                selected: function(url) {
                    if (url === undefined) return Lang.ui.buttonVoteNegativeSelectedPopout;
                    Lang.ui.buttonVoteNegativeSelectedPopout = url;
                }
            }
        }
    },
    text: {

    }
}; 
PCFW.override = {
    init: function() {
        var objects = Object.keys(PCFW.override);
        objects.splice(0,2);
        for (var i in objects)
            PCFW.override[objects[i]].init();
    },
    kill: function() {
        var objects = Object.keys(PCFW.override);
        objects.splice(0,2);
        for (var i in objects)
            PCFW.override[objects[i]].kill();
    },
    chatModels: {
        init: function() {
            PCFW.__original.chatCommand         = Models.chat.chatCommand;
            PCFW.__original.chatCommandProxy    = $.proxy(PCFW.__original.chatCommand,Models.chat);


            PCFW.__original.chatReceiveProxy    = $.proxy(Models.chat.receive,Models.chat);
            PCFW.events.on(PCFW.events.CHAT,PCFW.__original.chatReceiveProxy,PCFW.events.priority.SYSTEM);

            PCFW.events.on("chatSoundUpdate",   $.proxy(Chat.onChatSoundUpdate,Chat));
            PCFW.events.on("chatDelete",        $.proxy(Chat.onChatDelete,Chat));
            PCFW.events.on("chatReceived",      $.proxy(Chat.onChatReceived,Chat));
            PCFW.events.on("chatClear",         $.proxy(Chat.onChatClear,Chat));
            PCFW.events.on("timestampUpdate",   $.proxy(Chat.onTimestampUpdate,Chat));

            Models.chat.chatCommand             = function(msg) {
                                                    if (PCFW.__original.chatCommandProxy(msg) === true)
                                                        return true;
                                                    if (msg.length === 0 || msg.substring(0,1) !== '/') return false;
                                                    var args = msg.split(' ');
                                                    PCFW.commands.execute(args.splice(0,1)[0].substring(1),args);
                                                };

            PCFW.__original.chatDispatch        = Models.chat.dispatchEvent;
            Models.chat.dispatchEvent           = function (type,data) {
                                                    PCFW.events.emit(type,data);
                                                };
        },
        kill: function() {
            Models.chat.chatCommand             = PCFW.__original.chatCommand;
            Models.chat.dispatchEvent           = PCFW.__original.chatDispatch;
        }
    },
    socketListener: {
        init: function() {
            PCFW.__original.SocketListenerChat  = SocketListener.chat;
            SocketListener.chat                 = function(data) {
                                                    data.mention = false;
                                                    data.cancelled = false;
                                                    if (-1 < $("<span/>").html(data.message).text().indexOf("@" + Models.user.data.username) + " ")
                                                        data.mention = true;
                                                    API.delayDispatch(API.CHAT,data);
                                                };
        },
        kill: function() {
            SocketListener.chat                 = PCFW.__original.SocketListenerChat;
        }
    },
    API: {
        init: function() {
            PCFW.__original.delayDispatch       = API.delayDispatch;
            API.delayDispatch                   = function(event,data) {
                                                    if (!API.isReady)
                                                        return;
                                                    PCFW.events.emit(event,data);
                                                    if (API.__events[event]) {
                                                        setTimeout(function() {
                                                            API.dispatchEvent(event,data);
                                                            event = null;
                                                            data = null;
                                                        }, 1000);
                                                    }
                                                };
        },
        kill: function() {
            API.delayDispatch                   = PCFW.__original.delayDispatch;
        }
    }
}; 
PCFW.init();
window['PCFW'] = PCFW;
window['PCFW']['GUI'] = window['PCFW'].GUI;