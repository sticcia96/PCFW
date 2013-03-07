PCFW.commands = {
    __commands: {},
    add: function(command,callback) {
        if (command !== undefined) command = command.toString();
        if (command === undefined || command.length < 1 || command.indexOf(' ') > -1 || callback === undefined || PCFW.commands.isset(command) === true) return false;
        return PCFW.commands.__commands[command.toString()] = callback,true;
    },
    remove: function(command) {
        if (command === undefined || PCFW.commands.__commands[command.toString()] === undefined) return false;
        return delete PCFW.commands.__commands[command.toString()],true;
    },
    isset: function(command) {
        if (command === undefined) return false;
        return PCFW.commands.__commands[command.toString()] !== undefined;
    },
    execute: function(command,data) {
        if (PCFW.commands.isset(command) === false) return false;
        PCFW.commands.__commands[command.toString()](data);
    }
};