function initMap() {
  var styleArray = [
    {
      elementType: "geometry",
      stylers: [{"color": "#343554"}]
    },{
      elementType: "labels",
      stylers: [{"visibility": "off"}]
    },{
      featureType: "road",
      elementType: "all",
      stylers: [{"color": "#787996"}]
    }
  ];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.052532, lng: 121.533171},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    zoom: 18,
    styles: styleArray
  });
  var image = {
    url: 'img/logo.png',
    };
  var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker = new google.maps.Marker({
        map: map,
        icon: image,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos
      });
      marker.addListener('click', toggleBounce);
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  // gps
  var fenway = {lat: 35.655335, lng: 139.7456987};
  var gps = new google.maps.Map(document.getElementById('gps'), {
    center: fenway,
    mapTypeControl: false,
    zoomControl: false,
    zoom: 17
  });
  var marker = new google.maps.Marker({
    position: fenway,
    map: gps,
    draggable: true,
    animation: google.maps.Animation.DROP
  });

  // streetview
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('stvw'), {
        position: fenway,
        pov: {
          heading: 0,
          pitch: 8,
        },
        fullScreenControl: false,
        linksControl: false,
        panControl: false,
        addressControl: false,
        enableCloseButton: false,
        zoomControl: false
      });
  map.setStreetView(panorama);



  // var gps = new google.maps.Map(document.getElementById('gps'), {
  //   center: {lat: 35.6585957, lng: 139.7451379},
  //   zoom: 17,
  //   mapTypeControl: false,
  //   zoomControl: false
  // });
  // var marker = new google.maps.Marker({
  //   position: {lat: 35.6585957, lng: 139.7451379},
  //   map: gps,
  //   draggable: true,
  //   animation: google.maps.Animation.DROP
  // });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
// marker animate
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
