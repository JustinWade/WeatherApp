const request = require("request-promise");

//const API_KEY = e89d70cba7027a5a8a112a26781a5ad1;

class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e89d70cba7027a5a8a112a26781a5ad1&units=imperial`,
      json: true,
    })
      .then(function (res) {
        callback(res);
      })
      .catch(function (err) {
        console.log(err);
        callback({ error: "Could not reach OpenWeatherMap API." });
      });
  }
}

module.exports = Weather;
