import React from "react";
import "./App.scss";
import PlaceInput from "./components/PlaceInput/PlaceInput";
import { Preloader } from "./components/Preloader/Preloader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

class App extends React.Component {
  state = {
    placeLocation: null,
    loading: true,
  };

  handlePlaceChange = (placeLocation) => {
    this.setState({ placeLocation, loading: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <PlaceInput onPlaceSelected={this.handlePlaceChange} />
          <ErrorBoundary>
            {loading ? (
              <Preloader />
            ) : (
              <WeatherInfo placeLocation={this.state.placeLocation} />
            )}
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
