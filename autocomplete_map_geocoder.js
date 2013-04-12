function MapGeocoder(mapSelector, addressSelector, latSelector, lonSelector, initialLat, initialLon) {
  this.initialPosition = new google.maps.LatLng(initialLat, initialLon);
  this.map = this.initializeMap(mapSelector);
  this.address = $(addressSelector);
  this.latitude = $(latSelector);
  this.longitude = $(lonSelector);
  this.lon_selector = $(lonSelector);
  this.geocoder = new google.maps.Geocoder();
  this.marker = this.initializeMarker();
  this.listenToDragEvents();
  this.autocompleteAddress();
}

MapGeocoder.prototype.initializeMap = function (mapSelector){
  var mapOptions = {
    center: this.initialPosition,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  return new google.maps.Map($(mapSelector)[0], mapOptions);
}

MapGeocoder.prototype.initializeMarker = function (){
  var marker = new google.maps.Marker({map: this.map, draggable: true});
  marker.setPosition(this.initialPosition);
  return marker;
}

MapGeocoder.prototype.setLatLon = function (latitude, longitude){
  this.latitude.val(latitude);
  this.longitude.val(longitude);
}

MapGeocoder.prototype.setAddress = function (address){
  this.address.val(address);
}

MapGeocoder.prototype.setPosition = function (latitude, longitude){
  var location = new google.maps.LatLng(latitude, longitude);
  this.setLatLon(latitude, longitude);
  this.marker.setPosition(location);
  this.map.setCenter(location);
  this.map.setZoom(16);    
}

MapGeocoder.prototype.listenToDragEvents = function (){
  var _this = this;
  google.maps.event.addListener(this.marker, 'drag', function () {
    _this.geocoder.geocode({ 'latLng': _this.marker.getPosition() }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) { 
          _this.setAddress(results[0].formatted_address);
          _this.setLatLon(_this.marker.getPosition().lat(), _this.marker.getPosition().lng());
        }
      }
    });
  });
}

MapGeocoder.prototype.autocompleteAddress = function (){
  var _this = this;
  $("#address").autocomplete({
    source: function (request, response) {
      _this.geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
        response($.map(results, function (item) {
          return {
            label: item.formatted_address,
            value: item.formatted_address,
            latitude: item.geometry.location.lat(),
            longitude: item.geometry.location.lng()
          }
        }));
      })
    },
    select: function (event, ui) {
      _this.setPosition(ui.item.latitude, ui.item.longitude);
    }
  });  
}
