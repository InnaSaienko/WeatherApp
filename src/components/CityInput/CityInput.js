import React from "react";
import "./CityInput.scss";

class CityInput extends React.Component {
  onClickInput = async (e) => {
    // e.persist();
    const eventKey = e.key;
    console.log("event Key:", eventKey);
    const city = e.target.value;

    if (eventKey === "Enter") {
      if (/^[a-zA-Z ]+$/.test(city)) {
        e.target.classList.add("loading");

        if (await this.props.makeApiCall(city)) {
          e.target.placeholder = "Enter a City...";
        } else {
          e.target.placeholder = "City was not found, try again...";
        }
      } else {
        e.target.placeholder = "Please enter a valid city name...";
      }
      e.target.classList.remove("loading");
      e.target.value = "";
    }
  };

  render() {
    return (
      <input
        className="input"
        city={this.props.city}
        type="text"
        placeholder="Enter a City..."
        onKeyPress={this.onClickInput}
      />
    );
  }
}
export default CityInput;
