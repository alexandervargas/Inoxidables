(function ($) {
 "use strict";          

		  google.maps.event.addDomListener(window, 'load', init1);
            function init1() {
                var mapOptions = {
                    zoom: 11,
					scrollwheel: true,
                    center: new google.maps.LatLng(23.777176, 90.399452), // Dhaka
                    left: new google.maps.LatLng(34.052234, -118.243685), // Dhaka

                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                };
                var mapElement = document.getElementById('googleMap1');

                var map = new google.maps.Map(mapElement, mapOptions);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(23.777176, 90.399452),
                    position: new google.maps.LatLng(34.052234, -118.243685),
                    map: map
                });
            }
			
			
})(jQuery); 