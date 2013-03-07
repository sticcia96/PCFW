PCFW.override = {
    init: function() {
        PCFW.override.chatModels();
        PCFW.override.API();
    },
    kill: function() {
        Models.chat.chatCommand             = PCFW.__original.chatCommand;
        Models.chat.addEventListener        = PCFW.__original.chatAddEvent;
        Models.chat.removeEventListener     = PCFW.__original.chatRemoveEvent;
        Models.chat.dispatchEvent           = PCFW.__original.chatDispatch;
        API.delayDispatch                   = PCFW.__original.delayDispatch;
    },
    chatModels: function() {
        PCFW.__original.chatCommand         = Models.chat.chatCommand;

        PCFW.events.on("chatSoundUpdate",   $.proxy(Chat.onChatSoundUpdate,Chat));
        PCFW.events.on("chatDelete",        $.proxy(Chat.onChatDelete,Chat));
        PCFW.events.on("chatReceived",      $.proxy(Chat.onChatReceived,Chat));
        PCFW.events.on("chatClear",         $.proxy(Chat.onChatClear,Chat));
        PCFW.events.on("timestampUpdate",   $.proxy(Chat.onTimestampUpdate,Chat));

        Models.chat.chatCommand             = function(msg) {
                                                if (PCFW.__original.chatCommand(msg) === true)
                                                    return true;
                                                if (msg.length === 0 || msg.substring(0,1) !== '/') return false;
                                                var args = msg.split(' ');
                                                PCFW.commands.execute(args.splice(0,1)[0].substring(1),args);
                                            };

        PCFW.__original.chatAddEvent        = Models.chat.addEventListener;
        Models.chat.addEventListener        = function (event,callback) {
                                                PCFW.events.on(event,callback,PCFW.events.priority.SYSTEM);
                                            };

        PCFW.__original.chatRemoveEvent     = Models.chat.removeEventListener;
        Models.chat.removeEventListener     = function (event,callback) {
                                                PCFW.events.off(event,callback);
                                            };

        PCFW.__original.chatDispatch        = Models.chat.dispatchEvent;
        Models.chat.dispatchEvent           = function (event,data) {
                                                PCFW.events.emit(event,data);
                                            };
    },
    API: function() {
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
    }
};