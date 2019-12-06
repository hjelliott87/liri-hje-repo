require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var spotify = require("node-spotify-api");
var fs = require("fs");

var command = process.argv[2];
console.log(command);

var value = process.argv.slice(3).join("+");
console.log(value);

switch(command) {
    case 'movie-this':
        movie();
    break;
}

switch(command) {
    case 'band-this':
        band();
    break;
}

switch(command) {
    case 'do-what-it-says':
        fs.readFile("./random.txt");
    break;
}

function movie() {
    console.log("Inside movie command.");
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + value;
    console.log(queryURL);
    axios.get(queryURL).then(function(response){
        console.log(response.data)
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}

function band() {
    console.log("Inside band command.");
    var queryURL2 = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
    console.log(queryURL2);
    axios.get(queryURL2).then(function(response){
       // parse the response body (string) to a JSON object
      var jsonData = response.data;
      // eventData ends up being the string containing the show data we will print to the console
      var eventData = [
        "Artist: " + jsonData.artist.name,
        "Venue: " + jsonData.venue.name,
        "City: " + jsonData.venue.city,
        "Region: " + jsonData.venue.region,
        "Country: " + jsonData.venue.country,
        "Date: " + jsonData.date
      ];
      console.log(eventData);
      });
}