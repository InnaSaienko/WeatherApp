function GetDefaultPlacesByLatLon (props) {
    // gets location object from browser coordinates
    if (!props.geoCoordinates) return null;

    const g = new window.google.maps.Geocoder();
    g.geocode({ location: props.geoCoordinates })
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
      .catch((e) => console.warn("Geocoder failed due to: " + e));
  };
  export { GetDefaultPlacesByLatLon }