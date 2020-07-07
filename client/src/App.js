import React, { Component } from "react";

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Button,
  Input,
} from "reactstrap";

//import weather component
import Weather from "./Weather";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: "",
    };
  }

  //fetch data from api, put in json format, and put in our col
  getCityList = () => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((res) => {
        var cityList = res.map((r) => r.city_name);
        this.setState({ cityList });
      });
  };

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    fetch("/api/cities", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: this.state.newCityName }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.getCityList();
        this.setState({ newCityName: "" });
      });
  };

  getWeather = (city) => {
    fetch(`/api/weather${city}`)
      .then((res) => res.json())
      .then((weather) => {
        this.setState({ weather });
      });
  };

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  };

  componentDidMount() {
    this.getCityList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyWeather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">
                The current weather forecast from cities around the world.
              </p>
              <InputGroup>
                <Input
                  placeholder="City name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append"></InputGroupAddon>
                <Button color="primary" onClick={this.handleAddCity}>
                  Add City
                </Button>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}></Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather />
      </Container>
    );
  }
}

export default App;
