import React from "react";
import "./WeatherToday.scss";

class WeatherToday extends React.Component {
  render() {
    const tempC = Math.round(this.props.todayWeather.main.temp - 273, 15);
    const weather = this.props.todayWeather.weather[0].main;
    const iconId = this.props.todayWeather.weather[0].icon;
    const countryName = this.props.countryName;
    const city = this.props.cityName;

    return (
      <div className="weather-today">
        <h3 className="title-3">
          {city}, {countryName}
        </h3>
        <div className="weather-info">
          <div className="weather-icon">
            <img
              src={require(`../../assets/images/${iconId}.svg`)}
              alt="Weather Icon"
            />
            <p>{weather}</p>
          </div>
          <h2 className="title-2">{tempC}°C</h2>
          <div className="weather-more">
            <p className="text">
              Wind: <span>{this.props.todayWeather.wind.speed} kmph</span>
            </p>
            <p className="text">
              Precip: <span>{this.props.todayWeather.pop} %</span>
            </p>
            <p className="text">
              Pressure: <span>{this.props.todayWeather.main.pressure}mb</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherToday;
