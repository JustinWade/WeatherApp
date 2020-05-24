//1.) Import packages we want to use.

const path = require("path"); //Nodejs native module
const express = require("express"); //Backend server framework
const bodyParser = require("body-parser"); //HTTP data interpreter between front-end and back-end

var db = require("./database"); //Database

const ENV = process.env.NODE_ENV; //Node environment
const PORT = process.env.PORT || 5000; //Port for express server

//2.) Initalize express and register basic middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//4.) Register middleware routers
app.use("/api/cities", require("./api/cities"));
app.use("/api/weather", require("./api/weather"));

//3.) Make express responsive to requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(erclearr.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

//Export app variable
module.exports = app;
