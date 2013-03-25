module("events");

test("add/remove event",function() {
    var callback = function(){};
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.__events.test.length,1,"event added to event object");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
    strictEqual(PCFW.events.__events.test.length,0,"event removed to event object");
});