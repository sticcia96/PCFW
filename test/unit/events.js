module("events");
var callback = function() {};

test("add/remove event",function() {
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
});

test("emit event",function() {
    var i = 0,
        callback = function(data) {
            i++;
            strictEqual(i,1,"order: first callback");
            strictEqual(data.test,true,"event data received");
        };
    expect(4);
    PCFW.events.on("test",callback);
    strictEqual(PCFW.events.emit("test",{test:true}),true,"emit of event");
    i++;
    strictEqual(i,2,"order: then everything after emit");
    PCFW.events.off("test",callback);
});

test("emit priority",function() {
    expect(7);
    var i = 0,
        callbackHighest = function() { equal(i,PCFW.events.priority.HIGHEST); i++; },
        callbackMonitor = function() { equal(i,PCFW.events.priority.MONITOR); i++; },
        callbackNormal  = function() { equal(i,PCFW.events.priority.NORMAL);  i++; },
        callbackLowest  = function() { equal(i,PCFW.events.priority.LOWEST);  i++; },
        callbackSystem  = function() { equal(i,PCFW.events.priority.SYSTEM);  i++; },
        callbackHigh    = function() { equal(i,PCFW.events.priority.HIGH);    i++; },
        callbackLow     = function() { equal(i,PCFW.events.priority.LOW);     i++; };
    PCFW.events.on("test",callbackHighest,PCFW.events.priority.HIGHEST);
    PCFW.events.on("test",callbackMonitor,PCFW.events.priority.MONITOR);
    PCFW.events.on("test",callbackNormal ,PCFW.events.priority.NORMAL);
    PCFW.events.on("test",callbackLowest ,PCFW.events.priority.LOWEST);
    PCFW.events.on("test",callbackSystem ,PCFW.events.priority.SYSTEM);
    PCFW.events.on("test",callbackHigh   ,PCFW.events.priority.HIGH);
    PCFW.events.on("test",callbackLow    ,PCFW.events.priority.LOW);
    PCFW.events.emit("test",{});
});