$.fn.serializeObject=function(){var e={},n=this.serializeArray();return $.each(n,function(){void 0!==e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e},function(){function e(){var e;this.init=function(n){var t={center:{lat:-34.397,lng:150.644},zoom:8};return e=new google.maps.Map(n,t),this},this.createMarker=function(n,t,a){var i=new google.maps.Marker({position:new google.maps.LatLng(n,t),map:e,title:a}),o=new google.maps.InfoWindow({content:a});return google.maps.event.addListener(i,"click",function(){o.open(e,i)}),i}}function n(){return Math.max(document.documentElement.clientHeight,window.innerHeight||0)}function t(e,n){return e.offset().top-n}function a(){return n()-t($mapDisplay,5)+"px"}var i=new e;$(function(){$mapDisplay=$("#map-canvas"),$mapDisplay.css("height",a($mapDisplay,5)),i.init($mapDisplay[0]),$("form").submit(function(e){e.preventDefault();var n=$(e.target).serializeObject();i.createMarker(n.lat,n.lng,n.message)})})}();