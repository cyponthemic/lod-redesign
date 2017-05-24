var $ = require('jquery');
var Barba = require('barba.js');
var Scrollbar = require('smooth-scrollbar');
//load angular
//var angular = require('angular');
var home = require('./includes/home');


var main = {

    init: function() {
        home.init();
    }

}

$(document).ready( main.init );
