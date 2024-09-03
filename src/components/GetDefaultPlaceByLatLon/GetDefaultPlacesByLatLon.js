import { useEffect } from "react";
// gets location object from browser coordinates

function GetDefaultPlacesByLatLon(props) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const g = new window.google.maps.Geocoder();
        g.geocode({ location: geoLocation })
          .then((response) => {
            const index = response.results.findIndex(
              (result) =>
                result.types.includes("political") ||
                result.types.includes("administrative_area_level_2")
            );
            props.onDefaultPlacesAvailable(
              index !== -1 ? response.results[index] : null
            );
          })
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
export { GetDefaultPlacesByLatLon };
