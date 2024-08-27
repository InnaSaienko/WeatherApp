import React from "react";
import "./App.scss";
import PlaceInput from "./components/PlaceInput/PlaceInput";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import { Preloader } from "./components/Preloader/Preloader";

class App extends React.Component {
  state = {
    address: {
      city: "Reykjavik",
      countryCode: "IS",
      countryName: "Iceland",
    },
    dates: null,
  };

  setWeatherData = (data) => {
    const dayTimeToday = new Date(data.list[0].dt_txt);
    const time = `${dayTimeToday.getHours()}:${dayTimeToday
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const daysWeather = data.list.filter((item) => item.dt_txt.includes(time));

    this.setState({
      dates: daysWeather,
    });
  };

  componentDidMount = () => this.getWeatherData(this.state.address);

  getWeatherData = (address) => {
    const queryAddress = [address.city, address.countryCode]
      .filter((item) => item !== null)
      .join(",");

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${queryAddress}&APPID=92ac86e49bd033dac4bf08195ba344d1`
    )
      .then((response) => response.json())
      .then((data) => this.setWeatherData(data));
  };

  handlePlaceChange = (address) => {
    this.setState({
      address: {
        city: address.city,
        countryCode: address.countryCode,
        countryName: address.countryName,
      },
    }, this.getWeatherData(this.state.address));
  };
  
  render() {
    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <PlaceInput
            onPlaceSelected={this.handlePlaceChange}
          />
          {this.state.dates && this.state.dates.length > 0 ? (
            <WeatherInfo 
            address={this.state.address}
            weatherData={this.state.dates} 
            />
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    );
  }
}

export default App;
