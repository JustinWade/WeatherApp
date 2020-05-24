import React, { Component } from "react";

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
} from "reactstrap";
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

  handleInputChange = e;

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
            </Jumbotron>
            <InputGroup>
              <Input
                placeholder="City name..."
                value={this.state.newCityName}
                onChange={this.handleInputChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Weather />
      </Container>
    );
  }
}

export default App;
