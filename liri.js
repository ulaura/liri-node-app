// to access the keys in keys.js
var keys = require("./keys.js");

//to include the Twitter npm package
var Twitter = require("twitter");

//pulling the info from keys.js
var twitter = new Twitter ({
  	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret
});



//to include the Node Spotify API npm package
var Spotify = require('node-spotify-api');

//pulling the info from keys.js
var spotify = new Spotify({
	id: keys.spotifyKeys.id,
	secret: keys.spotifyKeys.secret
});



//to include the Request API npm package
//this will be used for the Open Movie Database
var request = require('request');

//the key to use OMDB
var omdbKey = "40e9cece";


//this variable will be used to store user commands
/*command options are as follows:
	my-tweets
	spotify-this-song
	movie-this
	do-what-it-says
*/
var userCommand = process.argv[2];


//for the twitter calls
if (userCommand === "my-tweets") {

	//the twitter account that will be pulled up
	//potential for later: change this part so the user is asked to input a twitter screen
	var myTweets = {screen_name: "LauraTest0714"};

	twitter.get("statuses/user_timeline", myTweets, function(error, tweets, response){

		if(error) {
			return console.log(error);

		} else {

			for (var i = 0; i < tweets.length; i++) {

				//convert UTC time to local time for tweet timestamp part 1
				var tweetDate = new Date(tweets[i].created_at);

				console.log(tweets[i].text);

				//convert UTC time to local time for tweet timestamp part 2
				console.log(tweetDate.toString()); 
				console.log("------------------------------------------");

				//console.log(JSON.stringify(tweets, null, 2)); << prints out entire response of call. saving for reference.
			}

		}


	});

}

//for the spotify calls 
else if (userCommand === "spotify-this-song") {

	//the song that will be searched
	var songChoice = "";

	//if the user doesn't put in a song, the default will be Bad Romance by Lady Gaga
	if(!process.argv[3]) {
		songChoice = "Bad Romance";

	} else {
		//this accomodates songs with multiple words in it
		for (i = 3; i < process.argv.length; i++) {
		songChoice += process.argv[i] + " ";
		}
	}

	spotify.search({type: "track", query: songChoice, limit: 1}, function(error, response){
		if (error) {
			return console.log(error);
		}

		//printing out song information
		for (j = 0; j < response.tracks.items[0].album.artists.length; j++) {
			console.log("Artist(s): " + response.tracks.items[0].album.artists[j].name);
			console.log("Song: " + response.tracks.items[0].name);
			console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
			console.log("Album: " + response.tracks.items[0].album.name);
		}
		
		//console.log(JSON.stringify(response, null, 2)); //<<keeping this for reference

	});

}


//for the open movie database (OMDB) calls
else if (userCommand === "movie-this") {

	//variable to hold movie the user wants to search for
	var omdbRequest = "";

	//if the user doesn't put in a movie title, the default search will be Mr. Nobody
	if (!process.argv[3]) {
		omdbRequest = "Mr. Nobody";

	} else {
		//the user's choice will be stored in variable omdbrequest
		for (k = 3; k < process.argv.length; k++) {
			omdbRequest += process.argv[k] + "+";
		}

	}

	//variable to hold the omdb url search with api key and omdb request
	var omdbMovie = "http://www.omdbapi.com/?apikey=40e9cece&t=" + omdbRequest;

	
	request(omdbMovie, function (error, response, body) {
		if (error) {
			return console.log(error);
		}

		//printint out desired information
		console.log("Title of the movie: " + JSON.parse(body).Title);
		console.log("Year the movie came out: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Country where the movie was produced: " + JSON.parse(body).Country);
		console.log("Movie language: " + JSON.parse(body).Language);
		console.log("Movie plot: " + JSON.parse(body).Plot);
		console.log("Actors in the movie: " + JSON.parse(body).Actors);


		//console.log(body);  //<<keeping for reference
	});



}


/*
I need an else if block for the do-what-it-says random search.
*/

//if the user forgets to put in a command for process.argv[2]
else {
	return console.log("There was an error.");
}
