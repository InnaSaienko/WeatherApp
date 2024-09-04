import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { GetInitialLocations } from "../GetInitialLocations/GetInitialLocations";
import { getLatLon, getAddress } from "../../utils/geocoder";
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

  extractPlaceLocation = (place) => {
    if (!place) {
      return null;
    }

    const address = getAddress(place);
    const geoCoordinates = getLatLon(place);
    const placeLocation = { address, geoCoordinates };

    return placeLocation;
  };

  handleInitialPlacesAvailable = (places) => {
    const index = places.findIndex(
      (place) =>
        place.types.includes("political") ||
        place.types.includes("administrative_area_level_2")
    );
    this.handlePlaceAvailable(index !== -1 ? places[index] : null);
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
        <GetInitialLocations
          onInitialPlacesAvailable={this.handleInitialPlacesAvailable}
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
          />
        </StandaloneSearchBox>
      </LoadScript>
    );
  }
}

export default PlaceInput;
