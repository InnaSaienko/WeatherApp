import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import "./PlaceInput.scss";

class PlaceInput extends React.Component {
  static loadScriptLibraries = ["places"];
  static searchBoxOptions = { types: ["(cities)"] };

  autocompleteInput = null;
  state = {
    inputValue: "",
  };

  constructor(props) {
    super(props);
    this.state.inputValue = props.city;
  }

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

  handlePlaceChange = () => {
    const places = this.autocompleteInput.getPlaces();

    if (places && places.length > 0) {
      const address = this.getAddress(places[0]);

      this.props.onPlaceSelected(address);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyCT25gIBoiANcNPkvHhxBXEzijzMseVaFc"
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
