import React from "react";
import "./App.scss";
import CityInput from "./components/CityInput/CityInput";
import WeatherToday from "./components/WeatherToday/WeatherToday";
import Button from "./components/Button/Button";
import WeatherBox from "./components/WeatherBox/WeatherBox";

class App extends React.Component {
  state = {
    city: undefined,
    dates: new Array(1),
    includeExtendDays: false,
  };

  updateState = (data) => {
    const city = data.city;
    const dayTimeToday = new Date(data.list[0].dt_txt);
    const time = `${dayTimeToday.getHours()}:${dayTimeToday
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const daysWeather = data.list.filter((item) => item.dt_txt.includes(time));

    this.setState({
      city: city,
      dates: daysWeather,
    });
  };

  makeApiCall = async (city) => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=92ac86e49bd033dac4bf08195ba344d1`
    ).then((response) => response.json());

    if (api_data.cod === "200") {
      this.updateState(api_data);
      return true;
    }
    return false;
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
      const boxLi = this.state.dates.slice(1, 5).map((day) => (
        <li className="list-item">
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className="menu-item">{boxLi}</ul>;
    };

    const DisplayWeatherInfo = ({ city }) => {
      if (!city) return null;

      return (
        <>
          <WeatherToday
            city={this.state.city}
            todayWeather={this.state.dates[0]}
          />
          {this.state.includeExtendDays && <WeatherBoxes />}
          <Button onClick={this.ButtonClick.bind(this)} isEnabled={this.state.includeExtendDays}/>
        </>
      );
    };

    return (
      <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="weather-main">
          <CityInput
            city={this.state.city}
            makeApiCall={this.makeApiCall.bind(this)}
          />
          <DisplayWeatherInfo city={this.state.city} />
        </div>
      </div>
    );
  }
}

export default App;
