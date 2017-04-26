var $ = require("jquery"),
    materialize = require("materialize");
//load angular
var angular = require('angular');
var home = require('./includes/home');
var app = angular.module('LOD',[]);

var ngMainNav = require('./ng/ngMainNav');
var main = {

    init: function() {
        home.init();
        $('.parallax').parallax();
    }

};
$(document).ready( main.init );