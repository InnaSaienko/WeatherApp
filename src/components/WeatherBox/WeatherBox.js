import React from "react";
import "./WeatherBox.scss";

class WeatherBox extends React.Component {
  getDayOfWeek = (date) => {
    const daysOfWeek = [
      // TODO: extract class prop or global
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()].slice(0, 3).toUpperCase();
  };

  render() {
    const date = new Date(this.props.dt_txt);
    const tempC = Math.round(this.props.main.temp - 273, 15);
    const iconId = this.props.weather[0].icon;
    return (
      <>
        <h3 className="title-3">{this.getDayOfWeek(date)}</h3>
        <img
          src={require(`../../assets/images/${iconId}.svg`)}
          alt="Weather Icon"
        />
        <p>{tempC}°C</p>
      </>
    );
  }
}

export default WeatherBox;
