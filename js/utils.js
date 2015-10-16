var Utils = {
    debounce: function(callback, wait) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var toCall = function() {
                timeout = null;
                callback.apply(context, args);
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(toCall, wait);
        }
    }
};