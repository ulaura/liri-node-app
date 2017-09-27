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


//this variable will be used to store user commands
/*command options are as follows:
	my-tweets
	spotify-this-song
	movie-this
	do-what-it-says
*/
var userCommand = process.argv[2];


//for the twitter calls
//potential for later: change this part so the user is asked to input a twitter screen
var myTweets = {screen_name: "LauraTest0714"};

twitter.get("statuses/user_timeline", myTweets, function(error, tweets, response){
	if (userCommand === "my-tweets" && !error) {

		for (var i = 0; i < tweets.length; i++) {

			//convert UTC time to local time for tweet timestamp part 1
			var tweetDate = new Date(tweets[i].created_at);

			console.log(tweets[i].text);

			//convert UTC time to local time for tweet timestamp part 2
			console.log(tweetDate.toString()); 
			console.log("------------------------------------------");

			//console.log(JSON.stringify(tweets, null, 2)); << prints out entire response of call. saving for reference.
		}

	} else {
		console.log(error);
	}
});


