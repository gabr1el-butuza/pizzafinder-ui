// Vars
var markers = [];
var map;

// Save all new and old locations in a list
var newLocations = [];
var newSelectedLocations;

// Modal: Place details
var placeName;
var phonePlace;
var program = [];
var placePhone;
var placeAddress;
var placeWebsite;
var placeRating;
var placeType;


// Map
function loadMap() {
    map = new GMaps({
        el: '#map',
        zoom: constZoom,
        lat: constLat,
        lng: constLng,

        click: function (e) {
            var placeId = e.placeId;
            var name = $("#name").val();
            if (placeId && name) {
                var geocoder = new google.maps.Geocoder();
                var service = new google.maps.places.PlacesService(map.map);

                geocoder.geocode({
                    'latLng': e.latLng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            service.getDetails({
                                    placeId: placeId
                                }, function (place, status) {
                                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                                        placeAddress = results[0].formatted_address;
                                        placeName = place.name;
                                        phonePlace = place.formatted_phone_number;
                                        placePhone = place.formatted_phone_number;
                                        placeWebsite = place.website;
                                        placeRating = place.rating;
                                        placeType = place.types[0];
                                        addMarker(map, e.latLng.lat(), e.latLng.lng());
                                        newSelectedLocations = {
                                            address: results[0].formatted_address,
                                            googleId: e.placeId,
                                            latitude: e.latLng.lat(),
                                            longitude: e.latLng.lng(),
                                            placeName: place.name,
                                            placePhone: place.formatted_phone_number,
                                            placeWebsite: place.website,
                                            placeRating: place.rating,
                                            placeType: place.types[0],
                                            placeName: place.name,
                                            phonePlace: place.formatted_phone_number,
                                            program: place.open_now
                                        };
                                        newLocations.push(newSelectedLocations);
                                    }
                                }
                            )
                        }
                        ;
                    }
                });
            }
        }

    });

}

// add a new marker on map
function addMarker(map, latitude, longitude, googleId) {
    var marker = map.addMarker({
            lat: latitude,
            lng: longitude
        }
    );
    markers.push(marker);
    deleteMarker(marker);
}

// Delete all markers
function removeAllMarkers() {
    map.removeMarkers(markers);
}

// Delete a marker
function deleteMarker(marker) {
    marker.addListener("click", function (e) {//or dblclick is more safety
            marker.setMap(null);
            var i = 0, find = false;
            while (i < markers.length && !find) {
                if (markers[i] == marker) {
                    find = true;
                    markers.pop(marker);
                }
                else i++;
            }
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();
            for (i = 0; i < newLocations.length; i++) {
                if (newLocations[i].latitude == lat && newLocations[i].longitude == lng) {
                    newLocations.splice(i, 1);
                }
            }
        }
    );
}

// Form: Center selected location on map
function centeredLoc(id, locations) {
    for (var item in locations) {
        if (locations[item].id == id) {
            var latitude = locations[item].latitude;
            var longitude = locations[item].longitude;
            map.setCenter(latitude, longitude);
            map.setZoom(constZoom);
        }
    }
}

