//Generated at 03-06-2013 19:07:43 
/**
 * @this {NotImplementedError}
 */
function NotImplementedError(message) {
    this.name = "NotImplementedError";
    this.message = (message || "");
}
NotImplementedError.prototype = Error.prototype;
/**
 * @this {EventEmitError}
 */
function EventEmitError(data) {
    this.name = "EventEmitError";
    this.message = "emit";
    this.error = data.error;
    this.event = {
        type: data.type,
        data: data.data
    }
}
EventEmitError.prototype = Error.prototype;

if (typeof PCFW !== "undefined") PCFW.kill();

var PCFW = {
    __original: {},
    version: {
        major: 0,
        minor: 6,
        patch: 2
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
    /**
     * @this {PCFW.commands}
     */
    add: function(command,callback) {
        if (command !== undefined) command = command.toString();
        if (command === undefined || command.length < 1 || command.indexOf(' ') > -1 || callback === undefined || this.isset(command) === true) return false;
        return this.__commands[command.toString()] = callback,true;
    },
    /**
     * @this {PCFW.commands}
     */
    remove: function(command) {
        if (command === undefined || this.isset(command) === false) return false;
        return delete this.__commands[command.toString()],true;
    },
    /**
     * @this {PCFW.commands}
     */
    isset: function(command) {
        if (command === undefined) return false;
        return this.__commands[command.toString()] !== undefined;
    },
    /**
     * @this {PCFW.commands}
     */
    execute: function(command,data) {
        if (this.isset(command) === false) return false;
        this.__commands[command.toString()](data);
    }
}; 
PCFW.events = {
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
    /**
     * @this (PCFW.events)
     */
    on: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
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
        this.__events[type].sort(this.__prioritySort);
        return true;
    },
    /**
     * @this (PCFW.events)
     */
    once: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (this.__events[type] === undefined) this.__events[type] = [];
        if (priority === undefined) priority = this.priority.NORMAL;
        this.__events[type].push({
            callback: callback,
            once:     true,
            priority: priority
        });
        this.__events[type].sort(this.__prioritySort);
        return true;
    },
    /**
     * @this (PCFW.events)
     */
    off: function(type,callback) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
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
    /**
     * @this (PCFW.events)
     */
    emit: function(type,data) {
        if (type === undefined || type === null || this.__events[type] === undefined) return false;
        if (data === undefined || data === null) data = {};
        var length = this.__events[type].length;
        for (var i = 0;i < length;i++) {
            if (typeof data.cancelled !== "undefined" && data.cancelled === true && this.__events[type][i].priority < this.priority.MONITOR)
                continue;
            try {
                if (this.__events[type][i] === undefined || this.__events[type][i].callback === undefined) {
                    this.__events[type].splice(i,1);
                    i--;
                    length--;
                } else
                    this.__events[type][i].callback(data);

                if (this.__events[type][i].once) {
                    this.__events[type].splice(i,1);
                    i--;
                    length--;
                }
            } catch (e) {
                this.__events[type].splice(i,1);
                i--;
                length--;
                try {
                    this.emit(type,data);
                } catch (e) {
                    throw e;
                }
                throw new EventEmitError({error:e,type:type,data:data});
            }
        }
        return true;
    }
}; 
PCFW.GUI = {
    new: function() {
        return new PCFWGUI();
    }
};
var PCFWGUI = Class.extend({
    /**
     * @this {PCFWGUI}
     */
    init: function() {
        this.__data = {};
        return this;
    },
    /**
     * @this {PCFWGUI}
     */
    data: function(setting,value) {
        if (value === undefined) return this.__data[setting];
        this.__data[setting] = value;
        return this;
    },
    /**
     * @this {PCFWGUI}
     */
    width: function(width) {
        return this.data('width',width);
    },
    /**
     * @this {PCFWGUI}
     */
    height: function(height) {
        return this.data('height',height);
    },
    /**
     * @this {PCFWGUI}
     */
    textfield: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    toggle: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    checkbox: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    button: function() {
        throw new NotImplementedError();
    }
}) 
PCFW.room = {
    images: {
        woot: {
            normal: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositive : Lang.ui.buttonVotePositive = url;
            },
            disabled: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositiveDisabled : Lang.ui.buttonVotePositiveDisabled = url;
            },
            selected: function(url) {
                return url === undefined ? Lang.ui.buttonVotePositiveSelected : Lang.ui.buttonVotePositiveSelected = url;
            },
            popout: {
                normal: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositivePopout : Lang.ui.buttonVotePositivePopout = url;
                },
                disabled: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositiveDisabledPopout : Lang.ui.buttonVotePositiveDisabledPopout = url;
                },
                selected: function(url) {
                    return url === undefined ? Lang.ui.buttonVotePositiveSelectedPopout : Lang.ui.buttonVotePositiveSelectedPopout = url;
                }
            }
        },
        meh: {
            normal: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegative : Lang.ui.buttonVoteNegative = url;
            },
            disabled: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegativeDisabled : Lang.ui.buttonVoteNegativeDisabled = url;
            },
            selected: function(url) {
                return url === undefined ? Lang.ui.buttonVoteNegativeSelected : Lang.ui.buttonVoteNegativeSelected = url;
            },
            popout: {
                normal: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativePopout : Lang.ui.buttonVoteNegativePopout = url;
                },
                disabled: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativeDisabledPopout : Lang.ui.buttonVoteNegativeDisabledPopout = url;
                },
                selected: function(url) {
                    return url === undefined ? Lang.ui.buttonVoteNegativeSelectedPopout : Lang.ui.buttonVoteNegativeSelectedPopout = url;
                }
            }
        }
    },
    text: {

    }
}; 
PCFW.override = {
    /**
     * @this (PCFW.override)
     */
    init: function() {
        var objects = Object.keys(this);
        objects.splice(0,2);
        for (var i in objects) {
            if (typeof this[objects[i]].init === 'function')
                this[objects[i]].init();
        }
    },
    /**
     * @this (PCFW.override)
     */
    kill: function() {
        var objects = Object.keys(this);
        objects.splice(0,2);
        for (var i in objects) {
            if (typeof this[objects[i]].kill === 'function')
                this[objects[i]].kill();
        }
    },
    chatModels: {
        init: function() {
            PCFW.__original.chatCommand         = Models.chat.chatCommand;
            PCFW.__original.chatCommandProxy    = $.proxy(PCFW.__original.chatCommand,Models.chat);


            PCFW.__original.chatReceiveProxy    = $.proxy(Models.chat.receive,Models.chat);
            PCFW.events.on(
                API.CHAT,
                PCFW.__original.chatReceiveProxy,
                PCFW.events.priority.SYSTEM
            );

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
            PCFW.__original.SocketListenerUserUpdate = SocketListener.userUpdate;
            SocketListener.userUpdate                = function(data) {
                                                         if (Models.room.data.users) {
                                                             var user = Models.room.userHash[data.id];
                                                             if (user) {
                                                                 API.delayDispatch("userUpdate",{userid:data.id,before: jQuery.extend(true,{},user),now: data,cancelled: false});
                                                                 Models.room.userUpdate(data);
                                                             }
                                                         }
                                                     };
        },
        kill: function() {
            SocketListener.chat                 = PCFW.__original.SocketListenerChat;
            SocketListener.userUpdate           = PCFW.__original.SocketListenerUserUpdate;
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
    },
    Socket: {
        init: function() {
            PCFW.__original.socketOpen          = Socket.open;
            /**
            * @this {Socket}
            */
            Socket.open                         = function() {
                                                    this.backoff = 0;
                                                    var a = Slug,
                                                        b = this;
                                                    Models.room.data.id && (a = Models.room.data.id);
                                                    console.log("open!",a);
                                                    a = new RoomJoinService(a);
                                                    a.successCallback = function() {
                                                        b.pong();
                                                        PCFW.events.emit('onSocketJoin',{});
                                                    };
                                                    a.errorCallback = function() {
                                                        console.log("boom time");
                                                        PCFW.events.emit('onSocketError',{});
                                                    }
                                                };

            PCFW.__original.socketClose         = Socket.close;
            /**
            * @this {Socket}
            */
            Socket.close                        = function(data) {
                                                    if (data) {
                                                        if (!data.wasClean) {
                                                            console.info("closing",data);
                                                            data = this.backoff;
                                                            if (5 >= data) {
                                                                data += 1;
                                                                socketInit(data);
                                                            }
                                                        } else alert("This session has now ended. Goodbye.");
                                                    }
                                                    PCFW.events.emit('onSocketClose',{});
                                                };
        },
        kill: function() {
            Socket.open                         = PCFW.__original.socketOpen;
            Socket.close                        = PCFW.__original.socketClose;
        }
    },
    ModelsRoom: {
        init: function() {
            PCFW.__original.userUpdateeProxy    = $.proxy(Models.room.userUpdate,Models.room);
            PCFW.events.on("userUpdate",PCFW.__original.userUpdateeProxy,PCFW.events.priority.SYSTEM);
        }
    }
}; 
PCFW.init();