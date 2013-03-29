PCFW.events = {
    __events: {},
    __prioritySort: function(a,b) { return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0; },
    priority: {
        HIGHEST: 0,
        HIGH:    1,
        NORMAL:  2,
        LOW:     3,
        LOWEST:  4,
        SYSTEM:  5,
        MONITOR: 6
    },
    on: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) PCFW.events.__events[type] = [];
        if (priority === undefined) priority = PCFW.events.priority.NORMAL;
        else {
            var a = false;
            for (var b in PCFW.events.priority) {
                if (PCFW.events.priority[b] === priority)
                    a = true;
            }
            if (!a) priority = PCFW.events.priority.NORMAL;
        }
        PCFW.events.__events[type].push({
            callback: callback,
            once:     false,
            priority: priority
        });
        PCFW.events.__events[type].sort(PCFW.events.__prioritySort);
        return true;
    },
    once: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) PCFW.events.__events[type] = [];
        if (priority === undefined) priority = PCFW.events.priority.NORMAL;
        PCFW.events.__events[type].push({
            callback: callback,
            once:     true,
            priority: priority
        });
        PCFW.events.__events[type].sort(PCFW.events.__prioritySort);
        return true;
    },
    off: function(type,callback) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (PCFW.events.__events[type] === undefined) return false;
        var found = false;
        for (var i in PCFW.events.__events[type]) {
            if (PCFW.events.__events[type][i].callback === callback) {
                PCFW.events.__events[type].splice(i,1);
                found = true;
            }
        }
        return found;
    },
    emit: function(type,data) {
        if (type === undefined || type === null) return false;
        if (data === undefined || data === null) data = {};
        var length = PCFW.events.__events[type].length;
        for (var i = 0;i < length;i++) {
            if (typeof data.cancelled !== "undefined" && data.cancelled === true && PCFW.events.__events[type][i].priority < PCFW.events.priority.MONITOR)
                continue;
            try {
                if (PCFW.events.__events[type][i] === undefined || PCFW.events.__events[type][i].callback === undefined) {
                    PCFW.events.__events[type].splice(i,1);
                    i--;
                    length--;
                } else
                    PCFW.events.__events[type][i].callback(data);

                if (PCFW.events.__events[type][i].once) {
                    PCFW.events.__events[type].splice(i,1);
                    i--;
                    length--;
                }
            } catch (e) {
                PCFW.events.__events[type].splice(i,1);
                i--;
                length--;
                try {
                    PCFW.events.emit(type,data);
                } catch (e) {
                    throw e;
                }
                throw new EventEmitError({error:e,type:type,data:data});
            }
        }
        return true;
    }
};