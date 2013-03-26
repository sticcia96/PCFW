module("events");
var callback = function() {};

test("add/remove event",function() {
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("test",callback),true,"true on added event");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("test",callback),true,"true on removed event");
});

test("emit event",function(assert) {
    var callback = function(data) {
            assert.step(1);
            strictEqual(data.test,true,"event data received");
        };
    expect(4);
    PCFW.events.on("test",callback);
    strictEqual(PCFW.events.emit("test",{test:true}),true,"emit of event");
    assert.step(2);
    PCFW.events.off("test",callback);
});

test("emit priority",function(assert) {
    expect(7);
    var callbackHighest = function() { assert.step(PCFW.events.priority.HIGHEST+1); },
        callbackMonitor = function() { assert.step(PCFW.events.priority.MONITOR+1); },
        callbackNormal  = function() { assert.step(PCFW.events.priority.NORMAL+1);  },
        callbackLowest  = function() { assert.step(PCFW.events.priority.LOWEST+1);  },
        callbackSystem  = function() { assert.step(PCFW.events.priority.SYSTEM+1);  },
        callbackHigh    = function() { assert.step(PCFW.events.priority.HIGH+1);    },
        callbackLow     = function() { assert.step(PCFW.events.priority.LOW+1);     };
    PCFW.events.on("test",callbackHighest,PCFW.events.priority.HIGHEST);
    PCFW.events.on("test",callbackMonitor,PCFW.events.priority.MONITOR);
    PCFW.events.on("test",callbackNormal ,PCFW.events.priority.NORMAL);
    PCFW.events.on("test",callbackLowest ,PCFW.events.priority.LOWEST);
    PCFW.events.on("test",callbackSystem ,PCFW.events.priority.SYSTEM);
    PCFW.events.on("test",callbackHigh   ,PCFW.events.priority.HIGH);
    PCFW.events.on("test",callbackLow    ,PCFW.events.priority.LOW);
    PCFW.events.emit("test",{});
});