PCFW.GUI = {
    new: function() {
        return new PCFWGUI();
    }
};
var PCFWGUI = Class.extend({
    /**
     * @this {PCFWGUI}
     */
    init: function() {
        this.__data = {};
        return this;
    },
    /**
     * @this {PCFWGUI}
     */
    data: function(setting,value) {
        if (value === undefined) return this.__data[setting];
        this.__data[setting] = value;
        return this;
    },
    /**
     * @this {PCFWGUI}
     */
    width: function(width) {
        return this.data('width',width);
    },
    /**
     * @this {PCFWGUI}
     */
    height: function(height) {
        return this.data('height',height);
    },
    /**
     * @this {PCFWGUI}
     */
    textfield: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    toggle: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    checkbox: function() {
        throw new NotImplementedError();
    },
    /**
     * @this {PCFWGUI}
     */
    button: function() {
        throw new NotImplementedError();
    }
})