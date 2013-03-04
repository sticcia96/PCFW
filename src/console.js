PCFW.console = {
    log: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.log.apply(console, msgs);
    },
    error: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.error.apply(console, msgs);
    },
    trace: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.trace.apply(console, msgs);
    },
    info: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.info.apply(console, msgs);
    },
    warn: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.warn.apply(console, msgs);
    },
    assert: function() {
        var msgs = ["[PCFW]"];
        while (arguments.length) msgs.push([].shift.call(arguments));
        console.assert.apply(console, msgs);
    }
};