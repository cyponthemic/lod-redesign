var $ = require('jquery');
//load angular
var angular = require('angular');
var home = require('./includes/home');

var app = angular.module('LOD', [ 'ngMaterial' ]);

var main = {

    init: function() {
        home.init();
    }

}

$(document).ready( main.init );