module("events");
var callback = function() {};

test("add/remove event",function() {
    strictEqual(PCFW.events.on(),false,"check for no parameters when adding");
    strictEqual(PCFW.events.on("testAddRemove",callback),true,"true on added event");
    strictEqual(PCFW.events.off(),false,"check for no parameters when removing");
    strictEqual(PCFW.events.off("testAddRemove",callback),true,"true on removed event");
});

test("emit event",function(assert) {
    var callback = function(data) {
            assert.step(1);
            strictEqual(data.test,true,"event data received");
        };
    expect(4);
    PCFW.events.once("testEmit",callback);
    strictEqual(PCFW.events.emit("testEmit",{test:true}),true,"emit of event");
    assert.step(2);
    PCFW.events.off("testEmit",callback);
});

test("once events",function(assert) {
    expect(1);
    var callback = function() { ok(true); };
    PCFW.events.once("onceTest",callback);
    PCFW.events.emit("onceTest");
    PCFW.events.emit("onceTest");
})

test("emit priority",function(assert) {
    expect(7);
    var callbackHighest = function() { assert.step(PCFW.events.priority.HIGHEST+1,"HIGHEST"); },
        callbackMonitor = function() { assert.step(PCFW.events.priority.MONITOR+1,"MONITOR"); },
        callbackNormal  = function() { assert.step(PCFW.events.priority.NORMAL+1, "NORMAL");  },
        callbackLowest  = function() { assert.step(PCFW.events.priority.LOWEST+1, "LOWEST");  },
        callbackSystem  = function() { assert.step(PCFW.events.priority.SYSTEM+1, "SYSTEM");  },
        callbackHigh    = function() { assert.step(PCFW.events.priority.HIGH+1,   "HIGH");    },
        callbackLow     = function() { assert.step(PCFW.events.priority.LOW+1,    "LOW");     };
    PCFW.events.once("testPriority",callbackHighest,PCFW.events.priority.HIGHEST);
    PCFW.events.once("testPriority",callbackMonitor,PCFW.events.priority.MONITOR);
    PCFW.events.once("testPriority",callbackNormal ,PCFW.events.priority.NORMAL);
    PCFW.events.once("testPriority",callbackLowest ,PCFW.events.priority.LOWEST);
    PCFW.events.once("testPriority",callbackSystem ,PCFW.events.priority.SYSTEM);
    PCFW.events.once("testPriority",callbackHigh   ,PCFW.events.priority.HIGH);
    PCFW.events.once("testPriority",callbackLow    ,PCFW.events.priority.LOW);
    PCFW.events.emit("testPriority");
});

test("cancelable event",function(assert) {
    expect(3);
    var callbackHighest = function(data) { assert.step(1); },
        callbackMonitor = function(data) { assert.step(3); },
        callbackNormal  = function(data) { ok(false); },
        callbackLowest  = function(data) { ok(false); },
        callbackSystem  = function(data) { ok(false); },
        callbackHigh    = function(data) { assert.step(2); data.cancelled = true; },
        callbackLow     = function(data) { ok(false); };
    PCFW.events.once("testCancelable",callbackHighest,PCFW.events.priority.HIGHEST);
    PCFW.events.once("testCancelable",callbackMonitor,PCFW.events.priority.MONITOR);
    PCFW.events.once("testCancelable",callbackNormal ,PCFW.events.priority.NORMAL);
    PCFW.events.once("testCancelable",callbackLowest ,PCFW.events.priority.LOWEST);
    PCFW.events.once("testCancelable",callbackSystem ,PCFW.events.priority.SYSTEM);
    PCFW.events.once("testCancelable",callbackHigh   ,PCFW.events.priority.HIGH);
    PCFW.events.once("testCancelable",callbackLow    ,PCFW.events.priority.LOW);
    PCFW.events.emit("testCancelable",{cancelled:false});
});

test("catch errors on events",function(assert) {
    expect(2);
    var errorCallback = function() { throw new Error(); },
        normalCallback = function() { ok(true,"other events called after error"); };
    PCFW.events.once("testErrorCatch",errorCallback  ,PCFW.events.priority.HIGHEST);
    PCFW.events.once("testErrorCatch",normalCallback);
    throws(function() {
        PCFW.events.emit("testErrorCatch");
    },EventEmitError,"error catched");
});