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
    /**
     * @this (PCFW.events)
     */
    on: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (this.__events[type] === undefined) this.__events[type] = [];
        if (priority === undefined) priority = this.priority.NORMAL;
        else {
            var a = false;
            for (var b in this.priority) {
                if (this.priority[b] === priority)
                    a = true;
            }
            if (!a) priority = this.priority.NORMAL;
        }
        this.__events[type].push({
            callback: callback,
            once:     false,
            priority: priority
        });
        this.__events[type].sort(this.__prioritySort);
        return true;
    },
    /**
     * @this (PCFW.events)
     */
    once: function(type,callback,priority) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (this.__events[type] === undefined) this.__events[type] = [];
        if (priority === undefined) priority = this.priority.NORMAL;
        this.__events[type].push({
            callback: callback,
            once:     true,
            priority: priority
        });
        this.__events[type].sort(this.__prioritySort);
        return true;
    },
    /**
     * @this (PCFW.events)
     */
    off: function(type,callback) {
        if (type === undefined || type === null || callback === undefined || callback === null) return false;
        if (this.__events[type] === undefined) return false;
        var found = false;
        for (var i in this.__events[type]) {
            if (this.__events[type][i].callback === callback) {
                this.__events[type].splice(i,1);
                found = true;
            }
        }
        return found;
    },
    /**
     * @this (PCFW.events)
     */
    emit: function(type,data) {
        if (type === undefined || type === null || this.__events[type] === undefined) return false;
        if (data === undefined || data === null) data = {};
        var length = this.__events[type].length;
        for (var i = 0;i < length;i++) {
            if (typeof data.cancelled !== "undefined" && data.cancelled === true && this.__events[type][i].priority < this.priority.MONITOR)
                continue;
            try {
                if (this.__events[type][i] === undefined || this.__events[type][i].callback === undefined) {
                    this.__events[type].splice(i,1);
                    i--;
                    length--;
                } else
                    this.__events[type][i].callback(data);

                if (this.__events[type][i].once) {
                    this.__events[type].splice(i,1);
                    i--;
                    length--;
                }
            } catch (e) {
                this.__events[type].splice(i,1);
                i--;
                length--;
                try {
                    this.emit(type,data);
                } catch (e) {
                    throw e;
                }
                throw new EventEmitError({error:e,type:type,data:data});
            }
        }
        return true;
    }
};