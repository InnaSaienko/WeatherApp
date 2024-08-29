import React from "react";
import "./WeatherToday.scss";

class WeatherToday extends React.Component {
  render() {
    const tempC = Math.round(this.props.todayWeather.main.temp - 273, 15);
    const weather = this.props.todayWeather.weather[0].main;
    const iconId = this.props.todayWeather.weather[0].icon;
    const speed = this.props.todayWeather.wind.speed;
    const precip = this.props.todayWeather.pop;
    const pressure = this.props.todayWeather.main.pressure;
    // const countryName = this.props.countryName;
    // const city = this.props.cityName;

    return (
      <div className="weather-today">
        <div className="weather-icon">
          <img
            src={require(`../../assets/images/${iconId}.svg`)}
            alt="Weather Icon"
          />
          <p>{weather}</p>
        </div>
        <div className="weather-title"><h2 className="title-2">{tempC}°C</h2></div>
        <div className="weather-more">
          <p className="text">
            Wind: <span>{speed} kmph</span>
          </p>
          <p className="text">
            Precip: <span>{precip} %</span>
          </p>
          <p className="text">
            Pressure: <span>{pressure}mb</span>
          </p>
        </div>
      </div>
    );
  }
}

export default WeatherToday;
