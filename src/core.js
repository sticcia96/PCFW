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