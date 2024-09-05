import React from "react";
import { Preloader } from "../Preloader/Preloader";
import WeatherToday from "../WeatherToday/WeatherToday";
import Button from "../Button/Button";
import WeatherBox from "../WeatherBox/WeatherBox";

const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

class WeatherInfo extends React.Component {
  state = {
    includeExtendedDays: false,
    dates: null,
    error: null,
    loading: true
  };

  componentDidMount = () =>
    this.getWeatherData(this.props.placeLocation.geoCoordinates);

  componentDidUpdate(prevProps) {
    const prevLocation = prevProps.placeLocation.geoCoordinates;
    const newLocation = this.props.placeLocation.geoCoordinates;

    if (
      prevLocation && newLocation && (prevLocation.lat !== newLocation.lat ||
      prevLocation.lng !== newLocation.lng)
    ) {
      this.getWeatherData(this.props.placeLocation.geoCoordinates);
    }
  }

  getWeatherData = (geoCoordinates) => {
    const lat = geoCoordinates.lat;
    const lng = geoCoordinates.lng;

    this.setState({ loading: true, error: null });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=${WEATHER_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.cod !== "200") {
          throw new Error(data.message);
        }
        this.setWeatherData(data);
      })
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        console.error("Fetching weather data failed:", error);
        this.setState({ error: error.message, loading: false });
      });
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
    const boxLi = this.state.dates.slice(1, 5).map((day, index) => (
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
    const { includeExtendedDays, dates, error, loading } = this.state;
    const { city, countryName } = this.props.placeLocation.address;
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
      <>
        <div className="city-title">
          <h3 className="title-3">
          {city && countryName ? `${city}, ${countryName}` : city ? city : countryName}
          </h3>
        </div>
        {loading ? (
          <Preloader />
        ) : (
          <>
            <WeatherToday todayWeather={dates[0]} />
            {includeExtendedDays && <this.weatherBoxes />}
            <Button
              onClick={this.buttonClick}
              isEnabled={includeExtendedDays}
            />
          </>
        )}
      </>
    );
  }
}

export default WeatherInfo;
