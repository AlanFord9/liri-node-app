require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require("fs");
var nodeArg = process.argv;
var command = nodeArg[2];
var userInput = nodeArg.slice(3).join(" ");
var movieU = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
var bandU = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
var moment = require('moment');
moment().format();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function songSearch(command, userInput) {
    if (!userInput) {
    spotify.search({ type: 'track', query: "the sign" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songData = data.tracks.items;

        console.log("Artist: " + songData[0].artists[0].name + "\nSong Title: " + songData[0].name +
        "\nPreview Track: " + songData[0].preview_url + "\nAlbum: " + songData[0].album.name);

    })} 
    else {
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songData = data.tracks.items;

            for(s = 0; s < songData.length; s++)

            console.log("Artist: " + songData[s].artists[0].name + "\nSong Title: " + songData[s].name +
            "\nPreview Track: " + songData[s].preview_url + "\nAlbum: " + songData[s].album.name + "\n-------------------------");
        });
    }
}

function movieSearch(userInput) {
    movieU = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    movieU2 = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"

    if (!userInput) {
    axios.get(movieU2).then(

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
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {

            console.log(error.request);
            } else {
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
    } 
    else {
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
                } 
                else if (error.request) {
                console.log(error.request);
                } 
                else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }
} 

function concertSearch() {

    axios.get(bandU).then(
        function(response) {

            var concertInfo = response.data

            for(c = 0; c < concertInfo.length; c++) {
            var concertDate = concertInfo[c].datetime
            var dateFormat = "YYYY-MM-DD"
            var convertedDate = moment(concertDate, dateFormat);

            console.log("Venue Name: " + concertInfo[c].venue.name + "\nCity/State: " + concertInfo[c].venue.city + ", " + concertInfo[c].venue.region +
            "\nDate: " + convertedDate.format("MM/DD/YYYY") + "\n-------------------------");
            }
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

function readTxt() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        // console.log(data);
        txtSearch = data.split(",");
        // console.log(txtSearch)
        songSearch(txtSearch[0], txtSearch[1]);
      });
}

function runSwitch(command, userInput) {

    switch (command) {
        case "spotify-this-song":
          songSearch(command, userInput);
          break;
        
        case "movie-this":
          movieSearch(userInput);
          break;
        
        case "concert-this":
          concertSearch(userInput);
          break;
        
        case "do-what-it-says":
          readTxt(command, userInput);
          break;
        default:
            console.log("idk bro")
        }
}

function pickCommand(command, userInput) {
        runSwitch(command, userInput)
}

pickCommand(command, userInput)