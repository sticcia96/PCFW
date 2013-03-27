module("room");

test("changing woot/meh",function() {
    var testValue = 'image.png';

    PCFW.room.images.woot.normal(testValue);
    strictEqual(PCFW.room.images.woot.normal(),testValue,"woot normal");
    PCFW.room.images.woot.disabled(testValue);
    strictEqual(PCFW.room.images.woot.disabled(),testValue,"woot disabled");
    PCFW.room.images.woot.selected(testValue);
    strictEqual(PCFW.room.images.woot.selected(),testValue,"woot selected");

    PCFW.room.images.woot.popout.normal(testValue);
    strictEqual(PCFW.room.images.woot.popout.normal(),testValue,"woot popout normal");
    PCFW.room.images.woot.popout.disabled(testValue);
    strictEqual(PCFW.room.images.woot.popout.disabled(),testValue,"woot popout disabled");
    PCFW.room.images.woot.popout.selected(testValue);
    strictEqual(PCFW.room.images.woot.popout.selected(),testValue,"woot popout selected");

    PCFW.room.images.meh.normal(testValue);
    strictEqual(PCFW.room.images.meh.normal(),testValue,"meh normal");
    PCFW.room.images.meh.disabled(testValue);
    strictEqual(PCFW.room.images.meh.disabled(),testValue,"meh disabled");
    PCFW.room.images.meh.selected(testValue);
    strictEqual(PCFW.room.images.meh.selected(),testValue,"meh selected");

    PCFW.room.images.meh.popout.normal(testValue);
    strictEqual(PCFW.room.images.meh.popout.normal(),testValue,"meh popout normal");
    PCFW.room.images.meh.popout.disabled(testValue);
    strictEqual(PCFW.room.images.meh.popout.disabled(),testValue,"meh popout disabled");
    PCFW.room.images.meh.popout.selected(testValue);
    strictEqual(PCFW.room.images.meh.popout.selected(),testValue,"meh popout selected");
});