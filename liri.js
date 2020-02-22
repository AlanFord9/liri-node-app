require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment')
var nodeArg = process.argv
var command = nodeArg[2]
var userInput = nodeArg.slice(3).join(" ");


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

}