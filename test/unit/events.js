module("events");

var callback = function(data) {
    strictEqual(data.test,true,"emit received");
};

test("add/remove event",function() {
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
});

test("emit event",function() {
    expect(2);
    PCFW.events.on("test",callback);
    strictEqual(PCFW.events.emit("test",{test:true}),"emit of event");
    PCFW.events.off("test",callback);
});