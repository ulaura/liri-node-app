// to access the twitter keys in keys.js
var twitter = require("./keys.js");

//this variable will be used to store user commands
/*command options are as follows:
	my-tweets
	spotify-this-song
	movie-this
	do-what-it-says
*/
var userCommand = process.argv[2];


//working on twitter calls first
var myTweets = {screen_name: "LauraTest0714"};

twitter.get("statuses/user_timeline", myTweets, function(error, tweets, response){
	if (userCommand === "my-tweets" && !error) {
		console.log(JSON.stringify(tweets, null, 2));
	} else {
		console.log(error);
	}
});
