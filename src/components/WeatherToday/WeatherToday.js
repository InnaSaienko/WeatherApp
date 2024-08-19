import React from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "./WeatherToday.scss";

countries.registerLocale(enLocale);

class WeatherToday extends React.Component {
  render() {
    const tempC = Math.round(this.props.todayWeather.main.temp - 273, 15);
    const weather = this.props.todayWeather.weather[0].main;
    const iconId = this.props.todayWeather.weather[0].icon;
    const countryCode = this.props.city.country;
    const country = countries.getName(countryCode, "en");

    return (
      <div className="weather-today">
        <h3 className="title-3">
          {this.props.city.name}, {country}
        </h3>
        <div className="weather-info">
          <div className="weather-icon">
            <img
              src={require(`../../assets/images/${iconId}.svg`)}
              alt="Weather Icon"
            />
            <p>{weather}</p>
          </div>
          <h2 className="title-2"></h2>
          <p className="text">{tempC}°C</p>
          <div className="weather-more">
            <p className="text">
              Wind: {this.props.todayWeather.wind.speed} kmph
            </p>
            <p className="text">Precip: {this.props.todayWeather.pop} %</p>
            <p className="text">
              Pressure: {this.props.todayWeather.main.pressure}mb
            </p>
          </div>
        </div>
        {/* <button className="btn-round"></button> */}
      </div>
    );
  }
}

export default WeatherToday;
