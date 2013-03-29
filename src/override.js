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
            PCFW.events.on(API.CHAT,PCFW.__original.chatReceiveProxy,PCFW.events.priority.SYSTEM);

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
    }
};