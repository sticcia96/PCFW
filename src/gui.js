PCFW.GUI = {
    __GUI: Class.extend({
        /**
         * @this {__GUI}
         */
        init: function() {
            this.__data = {};
            return this;
        },
        /**
         * @this {__GUI}
         */
        data: function(setting,value) {
            if (value === undefined) return this.__data[setting];
            this.__data[setting] = value;
            return this;
        },
        /**
         * @this {__GUI}
         */
        width: function(width) {
            return this.data('width',width);
        },
        /**
         * @this {__GUI}
         */
        height: function(height) {
            return this.data('height',height);
        },
        /**
         * @this {__GUI}
         */
        textfield: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        toggle: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        checkbox: function() {
            throw new NotImplementedError();
        },
        /**
         * @this {__GUI}
         */
        button: function() {
            throw new NotImplementedError();
        }
    }),
    new: function() {
        return new PCFW.GUI.__GUI();
    }
};