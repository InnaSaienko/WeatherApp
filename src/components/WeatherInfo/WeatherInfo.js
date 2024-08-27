import React from "react";
import WeatherToday from "../WeatherToday/WeatherToday";
import Button from "../Button/Button";
import WeatherBox from "../WeatherBox/WeatherBox";

class WeatherInfo extends React.Component {
  state = {
    includeExtendedDays: false,
  }

weatherBoxes = () => {
    const boxLi = this.props.weatherData.slice(1, 5).map((day, index) => (
      <li key={index} className="list-item">
        <WeatherBox {...day} />
      </li>
    ));

    return <ul className="menu-item">{boxLi}</ul>;
  };

  buttonClick = () => {
    this.setState((prevState) => {
      return {
        includeExtendedDays: !prevState.includeExtendedDays,
      };
    });
  };

  render() {
    // if (!this.props.address) return null;
    return (
      <>
        <WeatherToday
          cityName={this.props.address.city}
          countryName={this.props.address.countryName}
          todayWeather={this.props.weatherData[0]}
        />
        {this.state.includeExtendedDays && <this.weatherBoxes />}
        <Button
          onClick={this.buttonClick}
          isEnabled={this.includeExtendedDays}
        />
      </>
    );
  }
}


export default  WeatherInfo;
