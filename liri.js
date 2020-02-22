require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment')
var nodeArg = process.argv
var command = nodeArg[2]
var userInput = nodeArg.slice(3).join(" ");
var movieU = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
var bandU = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"



var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

if (command === "spotify-this-song") {

    // TODO Create default search if no song found for "The Sign" by Ace of Base.
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

    //   console.log(JSON.stringify(data, null, 2));

    var songData = data.tracks.items[0];
    console.log("Artist: " + songData.artists[0].name);
    console.log("Song Title: " + songData.name);
    console.log("Preview Track: " + songData.preview_url);
    console.log("Album: " + songData.album.name);

  });

    // TODO Create default search if no movie is entered to output data for the movie 'Mr. Nobody.'
} else if (command === "movie-this") {

    axios.get(movieU).then(
        function(response) {
            var movieData = response.data
            console.log(movieData.Title);
            console.log(movieData.Year);
            console.log(movieData.imdbRating);
            console.log(movieData.Ratings[1].Source + " gave this movie a rating of " + movieData.Ratings[1].Value);
            console.log(movieData.Country);
            console.log(movieData.Language);
            console.log(movieData.Plot);
            console.log(movieData.Actors);
        })
        .catch(function(error) {
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

} else if (command === "concert-this") {

    axios.get(bandU).then(
        function(response) {
            console.log(response)
        })
        .catch(function(error) {
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