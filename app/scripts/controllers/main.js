'use strict';

/**
 * @ngdoc function
 * @name computerVisionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the computerVisionApp
 */
angular.module('computerVisionApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.init = function(){
      $(function () {
        $(document).ready(function(){
          console.log('testtt');

          Webcam.attach( '#my_camera' );
          $( "#my_camera" ).find( "video").attr('id', 'my_video')

          var video = document.getElementById('my_video');
          var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');

          var colors = new tracking.ColorTracker(['yellow']);

          colors.on('track', function(event) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (event.data.length === 0) {
              // No colors were detected in this frame.
            } else {
              event.data.forEach(function(rect) {
                // rect.x, rect.y, rect.height, rect.width, rect.color
                context.strokeStyle = rect.color;
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
              });
            }
          });

          tracking.track('#my_video', colors, { camera: true });

        })
      });
    };

    $scope.init()

  });
