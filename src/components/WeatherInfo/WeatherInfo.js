import React from "react";
import { Preloader } from "../Preloader/Preloader";
import WeatherToday from "../WeatherToday/WeatherToday";
import Button from "../Button/Button";
import WeatherBox from "../WeatherBox/WeatherBox";

class WeatherInfo extends React.Component {
  state = {
    includeExtendedDays: false,
    dates: null,
    loading: true,
  };

  componentDidMount = () => this.getWeatherData(this.props.address);

  getWeatherData = (address) => {
    const queryAddress = [address.city, address.countryCode]
      .filter((item) => item !== null)
      .join(",");

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${queryAddress}&APPID=92ac86e49bd033dac4bf08195ba344d1`
    )
      .then((response) => response.json())
      .then((data) => this.setWeatherData(data))
      .then(() => this.setState({ loading: false }));
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
  weatherBoxes = () => {
    const boxLi = this.dates.slice(1, 5).map((day, index) => (
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
    const { includeExtendedDays, dates, loading } = this.state;
    return loading ? (
      <Preloader />
    ) : (
      <>
        <WeatherToday
          cityName={this.props.address.city}
          countryName={this.props.address.countryName}
          todayWeather={dates[0]}
        />
        {includeExtendedDays && <this.weatherBoxes />}
        <Button onClick={this.buttonClick} isEnabled={includeExtendedDays} />
      </>
    );
  }
}

export default WeatherInfo;
