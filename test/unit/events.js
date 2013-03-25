module("events");

test("event object empty",function() {
    function is_empty(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (obj === null || obj === undefined) return true;
        if (obj.length && obj.length > 0) return false;
        if (obj.length === 0)  return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
    strictEqual(is_empty(PCFW.events.__events),true,"empty event object");
});

test("add/remove event",function() {
    var callback = function(){};
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.__events.test.length,1,"event added to event object");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
    strictEqual(PCFW.events.__events.test.length,0,"event removed to event object");
});