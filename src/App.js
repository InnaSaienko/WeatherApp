import React from "react";
import "./App.scss";
import PlaceInput from "./components/PlaceInput/PlaceInput";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

class App extends React.Component {
  state = {
    placeLocation: {
      address: {
        city: "Reykjavik",
        countryCode: "IS",
        countryName: "Iceland",
      },
      geoCoordinates: {
        lat: null,
        lng: null,
      },
    },
  };

  handlePlaceChange = (placeLocation) => {
    this.setState({ placeLocation });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <PlaceInput onPlaceSelected={this.handlePlaceChange} />
          <ErrorBoundary>
            <WeatherInfo placeLocation={this.state.placeLocation} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
