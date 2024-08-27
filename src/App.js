import React from "react";
import "./App.scss";
import PlaceInput from "./components/PlaceInput/PlaceInput";
import WeatherToday from "./components/WeatherToday/WeatherToday";
import { Preloader } from "./components/Preloader/Preloader";
import Button from "./components/Button/Button";
import WeatherBox from "./components/WeatherBox/WeatherBox";

class App extends React.Component {
  state = {
    address: {
      city: "Reykjavik",
      countryCode: "IS",
      countryName: "Iceland",
    },
    dates: null,
    includeExtendDays: false,
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
  
  ButtonClick = () => {
    this.setState((prevState) => {
      return {
        includeExtendDays: !prevState.includeExtendDays,
      };
    });
  };

  render() {
    const WeatherBoxes = () => {
      const boxLi = this.state.dates.slice(1, 5).map((day, index) => (
        <li key={index} className="list-item">
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className="menu-item">{boxLi}</ul>;
    };

    const DisplayWeatherInfo = ({ address }) => {
      if (!address) return null;

      return (
        <>
          <WeatherToday
            cityName={this.state.address.city}
            countryName={this.state.address.countryName}
            todayWeather={this.state.dates[0]}
          />
          {this.state.includeExtendDays && <WeatherBoxes />}
          <Button
            onClick={this.ButtonClick.bind(this)}
            isEnabled={this.state.includeExtendDays}
          />
        </>
      );
    };

    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <PlaceInput
            // city={this.state.address.city}
            onPlaceSelected={this.handlePlaceChange}
          />
          {this.state.dates && this.state.dates.length > 0 ? (
            <DisplayWeatherInfo address={this.state.address} />
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    );
  }
}

export default App;
