require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var searchFor = process.argv.splice(3).join(" ");
console.log(searchFor);

function music() {
    spotify.search({ type: 'track', query: searchFor, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("The song's name: " + data.tracks.items[0].name); 
        console.log("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
        console.log("The album that the song is froms: " + data.tracks.items[0].album.name);
        
      });
}

function concert() {
    "https://rest.bandsintown.com/artists/" + searchFor+ "/events?app_id=codingbootcamp"
}

function movie() {
    var apiSearch;
    if (searchFor) {
        apiSearch = "http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy"

    }else {
        apiSearch = "http://www.omdbapi.com/?t='Mr. Nobody'&y=&plot=short&apikey=trilogy"
    }
// Then run a request to the OMDB API with the movie specified
request(apiSearch, function(error, response, body) {
   
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
  
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("Year the movie came out: " + JSON.parse(body).Released);
    console.log("The movie's rating is: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
    console.log("Language of the movie: " + JSON.parse(body).Language);
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
    

  }
});
}
switch (action) {
    case "movie-this":
    movie();
    break;

    case "spotify-this-song":
    music();
    break;

    // case "concert-this":
    // concert();
    // break;
}
     

