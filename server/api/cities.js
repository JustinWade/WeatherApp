var express = require("express");
var Cities = require("../models/cities");

//Module that handles all middleware for cities data
var router = express.Router();

//Retrieve and return cities from server
router.get("/", function (req, res) {
  Cities.retrieveAll(function (err, cities) {
    if (err) return res.json(err);
    return res.json(cities);
  });
});

//Sending and inserting data to server
router.post("/", function (req, res) {
  var city = req.body.city;

  Cities.insert(city, function (err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
