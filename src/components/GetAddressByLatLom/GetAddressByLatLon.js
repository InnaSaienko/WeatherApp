import React from "react";

function getAddressByLatLon() {
    
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geoCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        const g = new google.maps.Geocoder();
        g.geocode(geoCoordinates)
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((e) => console.warn("Geocoder failed due to: " + e));;
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
  