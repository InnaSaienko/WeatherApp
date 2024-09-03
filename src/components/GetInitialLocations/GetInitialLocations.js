import { useEffect } from "react";
// gets location object from browser coordinates

function GetInitialLocations(props) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const g = new window.google.maps.Geocoder();
        g.geocode({ location: geoLocation })
          .then((response) => props.onInitialPlacesAvailable(response.results))
          .catch((e) => {
            console.warn("Geocoder failed due to: " + e);
          });
      });
    } else {
      console.warn("Geolocation is not supported by this browser.");      
    }
  }, []);
  return null;
}
export { GetInitialLocations };
