import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { GetDefaultPlacesByLatLon} from "../GetDefaultPlaceByLatLon/GetDefaultPlacesByLatLon"
import "./PlaceInput.scss";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class PlaceInput extends React.Component {
  state = {
    inputValue: "",
    geoLocation: null,
  };

  static loadScriptLibraries = ["places"];
  static searchBoxOptions = { types: ["(cities)"] };

  searchBox = null;

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({ geoLocation });
      });
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  getLatLon = (place) => {
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

  getAddress = (place) => {
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

  extractPlaceLocation = (place) => {
    if (!place) {
      return null;
    }

    const address = this.getAddress(place);
    const geoCoordinates = this.getLatLon(place);
    const placeLocation = { address, geoCoordinates };

    return placeLocation;
  };

  handlePlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    const place = places && places.length > 0 ? places[0] : null;
    this.handlePlaceAvailable(place);
  };

  handlePlaceAvailable = (place) => {
    let placeLocation = null;

    if (place) {
      placeLocation = this.extractPlaceLocation(place);
    }

    if (placeLocation) {
      this.props.onPlaceSelected(placeLocation);
    }
    this.setState({ inputValue: "", geoLocation: null });
  };

  render() {
    return (
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={PlaceInput.loadScriptLibraries}
        loadingElement={<></>}
      >
        <GetDefaultPlacesByLatLon
          geoCoordinates={this.state.geoLocation}
          onDefaultPlacesAvailable={this.handlePlaceAvailable}
        />
        <StandaloneSearchBox
          onLoad={(searchBox) => (this.searchBox = searchBox)}
          options={PlaceInput.searchBoxOptions}
          onPlacesChanged={this.handlePlacesChanged}
        >
          <input
            id="city-input"
            className="input"
            type="text"
            placeholder="Enter a City..."
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            onKeyDown={(e) => console.log(this.state)}
          />
        </StandaloneSearchBox>
      </LoadScript>
    );
  }
}

export default PlaceInput;
