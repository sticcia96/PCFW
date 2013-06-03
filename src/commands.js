PCFW.commands = {
    __commands: {},
    /**
     * @this {PCFW.commands}
     */
    add: function(command,callback) {
        if (command !== undefined) command = command.toString();
        if (command === undefined || command.length < 1 || command.indexOf(' ') > -1 || callback === undefined || this.isset(command) === true) return false;
        return this.__commands[command.toString()] = callback,true;
    },
    /**
     * @this {PCFW.commands}
     */
    remove: function(command) {
        if (command === undefined || this.isset(command) === false) return false;
        return delete this.__commands[command.toString()],true;
    },
    /**
     * @this {PCFW.commands}
     */
    isset: function(command) {
        if (command === undefined) return false;
        return this.__commands[command.toString()] !== undefined;
    },
    /**
     * @this {PCFW.commands}
     */
    execute: function(command,data) {
        if (this.isset(command) === false) return false;
        this.__commands[command.toString()](data);
    }
};