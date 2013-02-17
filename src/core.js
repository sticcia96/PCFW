var _PCFW = Class.extend({
    __original: {},
    init: function() {
        this.__original.chatCommand = Models.chat.chatCommand;
        this.__original.delayDispatch = API.delayDispatch;
        API.delayDispatch = function(a,b) {
            this.isReady && this.__events[a] && PCFW.events.emit(a,b), setTimeout(function(){API.dispatchEvent(a,b);a=b=null},1E3);
        };

        log("PCFW version 0.1 initialized");
    },
    kill: function() {
        Models.chat.chatCommand = this.__original.chatCommand;
        API.delayDispatch = this.__original.delayDispatch;
    }
});