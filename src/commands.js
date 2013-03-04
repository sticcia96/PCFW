_PCFW.commands = {
    __commands: {},
    add: function(command,callback) {
        if (command === undefined || command.toString().length < 1 || callback === undefined || this.__commands[command.toString()] !== undefined) return false;
        return this.__commands[command.toString()] = callback,true;
    },
    remove: function(command) {
        if (command === undefined || this.__commands[command.toString()] === undefined) return false;
        return delete this.__commands[command.toString()],true;
    },
    isset: function(command) {
        if (command === undefined) return false;
        return this.__commands[command.toString()] !== undefined;
    }
};