module("events");
var i = 0,
    callback = function(data) {
        i++;
        strictEqual(i,1,"order: first callback");
        strictEqual(data.test,true,"event data received");
    };

test("add/remove event",function() {
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
});

test("emit event",function() {
    expect(4);
    PCFW.events.on("test",callback);
    strictEqual(PCFW.events.emit("test",{test:true}),true,"emit of event");
    i++;
    strictEqual(i,2,"order: then everything after emit");
    PCFW.events.off("test",callback);
});