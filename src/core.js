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