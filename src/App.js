import React from "react";
import "./App.scss";
import PlaceInput from "./components/PlaceInput/PlaceInput";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

class App extends React.Component {
  state = {
    address: {
      city: "Reykjavik",
      countryCode: "IS",
      countryName: "Iceland",
    }    
  };

  handlePlaceChange = (address) => {
    this.setState({
      address: {
        city: address.city,
        countryCode: address.countryCode,
        countryName: address.countryName,
      }
    });
    };

  render() {
    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <PlaceInput onPlaceSelected={this.handlePlaceChange} />
          <WeatherInfo address={this.state.address} />
        </div>
      </div>
    );
  }
}

export default App;
