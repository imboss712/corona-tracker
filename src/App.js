import React, { Component } from "react";
import { getLatestStats } from "./api/index";
import Card from "./components/Card";
import CountryPicker from "./components/CountryPicker";
import "./styles/App.css";

class App extends Component {
  state = {
    latestData: {},
  };

  async componentDidMount() {
    const latestData = await getLatestStats();
    this.setState({ latestData });
  }

  handleCountryChange = async (country) => {
    const latestData = await getLatestStats(country);
    this.setState({ latestData });
  };

  render() {
    const { latestData } = this.state;
    return (
      <div className="App">
        <div style={{ padding: "5px 8px", backgroundColor: "purple" }}>
          <h2 style={{ color: "white", textAlign: "center" }}>
            Covid-19 Tracker
          </h2>
        </div>
        <div style={{ padding: "25px" }}>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Card data={latestData} />
        </div>
      </div>
    );
  }
}

export default App;
