var $ = require('jquery');
var Barba = require('barba.js');
var Scrollbar = require('smooth-scrollbar');
var home = {
    init: function() {
        this.initSmoothScroll();
        this.initBarba();
    },
    initSmoothScroll: function() {
      let options = {
        'speed': .8
      }
      Scrollbar.initAll(options);
      var scrollContainer = document.getElementById('container1');
      var scrollbar = Scrollbar.init(scrollContainer);
      var setSkrollr = function($el, data) {
        for (var i = 0, l = data.length; i < l; i++) { // loop all data entries (scroll positions + css property & value)
            var d = data[i], // the current data entry
                px = d[0]; // the scroll position (in pixels)
                css = d[1]; // the css property + value to set
            $el.attr('data-' + px, css);
        }
      }
      setSkrollr($('#box-1'), [[0, 'width:100%'], [1500, 'width:0%']]);

      scrollbar.addListener(function (status) {
          console.log(status);
      });
    },
    initBarba: function(){
      var HideShowTransition = Barba.BaseTransition.extend({
        start: function() {
          this.newContainerLoading.then(this.finish.bind(this));
        },

        finish: function() {
          document.body.scrollTop = 0;
          this.done();
        }
      });
      var Homepage = Barba.BaseView.extend({
        namespace: 'index',
        onEnter: function() {
            // The new Container is ready and attached to the DOM.
            console.log('ready');
            $('.js-reveal').addClass('js-revealed');
        },
        onEnterCompleted: function() {
            // The Transition has just finished.
            console.log('completed');
            $('.js-revealed').removeClass('js-reveal');
        },
        onLeave: function() {
            // A new Transition toward a new page has just started.
            console.log('leave');
        },
        onLeaveCompleted: function() {
            // The Container has just been removed from the DOM.
            console.log('leaveCompleted');
        }
      });

      // Don't forget to init the view!
      Homepage.init();
      Barba.Pjax.start();
      Barba.Pjax.getTransition = function() {
        return HideShowTransition;
      };
    }
}

module.exports = home;
