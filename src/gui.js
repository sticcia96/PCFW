PCFW.GUI = {
    __GUI: Class.extend({
        init: function() {
            this.__data = {};
            return this;
        },
        data: function(setting,value) {
            if (value === undefined) return this.__data[setting];
            this.__data[setting] = value;
            return this;
        },
        width: function(width) {
            return this.data('width',width);
        },
        height: function(height) {
            return this.data('height',height);
        },
        textfield: function() {
            throw new NotImplementedError();
            return this;
        },
        toggle: function() {
            throw new NotImplementedError();
            return this;
        },
        checkbox: function() {
            throw new NotImplementedError();
            return this;
        },
        button: function() {
            throw new NotImplementedError();
            return this;
        }
    }),
    new: function(width,height) {
        return new PCFW.GUI.__GUI(width,height);
    }
};
