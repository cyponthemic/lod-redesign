var $ = require('jquery');

var home = {

    init: function() {
        this.yourFunction();
    },

    yourFunction: function() {
        console.log('inside test home.js');
    }
}

module.exports = home;