function getLatLon (place) {
    let geoLocation = {
      lat: null,
      lng: null,
    };

    if ("geometry" in place && "location" in place.geometry) {
      geoLocation.lat = place.geometry.location.lat();
      geoLocation.lng = place.geometry.location.lng();
    }
    return geoLocation;
  };

  function getAddress (place) {
    let address = {
      city: null,
      countryCode: null,
      countryName: null,
    };

    if (!place) {
      return address;
    }
    const addressComponents = place.address_components;

    if (addressComponents) {
      for (const component of addressComponents) {
        if (!component.types) {
          continue;
        }
        if (component.types.includes("locality")) {
          address.city = component.long_name;
        }
        if (component.types.includes("country")) {
          address.countryCode = component.short_name;
          address.countryName = component.long_name;
        }
        if (address.city !== null && address.countryCode !== null) {
          break;
        }
      }
    } else {
      address.city = place.name;
    }
    return address;
  };

  export { getLatLon, getAddress }