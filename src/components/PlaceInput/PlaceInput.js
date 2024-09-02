import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { GetDefaultPlacesByLatLon} from "../GetDefaultPlaceByLatLon/GetDefaultPlacesByLatLon"
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

    extractPlaceLocation = (place) => {
    if (!place) {
      return null;
    }

    const address = getAddress(place);
    const geoCoordinates = getLatLon(place);
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
