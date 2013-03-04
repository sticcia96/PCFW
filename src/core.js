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