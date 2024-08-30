import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import "./PlaceInput.scss";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class PlaceInput extends React.Component {
  static loadScriptLibraries = ["places"];
  static searchBoxOptions = { types: ["(cities)"] };

  autocompleteInput = null;
  state = {
    inputValue: "",
  };

  getAddress = (place) => {
    
    let placeLocation = {
      address: {
        city: null,
        countryCode: null,
        countryName: null,
      },
      geoCoordinates: {
      lat: null,
      lng: null
      }
    };
   
    if (!place) {
      return placeLocation;
    }
    
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    if(lat !== null && lng !== null) {
      this.setState(
        placeLocation.geoCoordinates = {
          lat: lat,
          lng: lng
        }
      )
    }
    const addressComponents = place.address_components;

    if (addressComponents) {
      for (const component of addressComponents) {
        if (!component.types) {
          continue;
        }
        if (component.types.includes("locality")) {
          placeLocation.address.city = component.long_name;
        }
        if (component.types.includes("country")) {
          placeLocation.address.countryCode = component.short_name;
          placeLocation.address.countryName = component.long_name;
        }
        if (placeLocation.address.city !== null && placeLocation.address.countryCode !== null) {
          break;
        }
      }
    } else {
      placeLocation.address.city = place.name;
    }
    return placeLocation;
  };

  handlePlaceChange = () => {
    const places = this.autocompleteInput.getPlaces();
    
    if (places && places.length > 0) {
      const placeLocation = this.getAddress(places[0]);
      
      this.props.onPlaceSelected(placeLocation);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    return (
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={PlaceInput.loadScriptLibraries}
        loadingElement={<></>}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (this.autocompleteInput = ref)}
          options={PlaceInput.searchBoxOptions}
          onPlacesChanged={this.handlePlaceChange}
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
