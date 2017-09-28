//will let the user know their call has been loaded
console.log('this is loaded');
console.log(" ");


var twitterKeys = {
  	consumer_key: 'pB7wuoGgNeVytiwOTcM5rjFoo',
  	consumer_secret: 'y5jGzDPc3tWRmirYvQFVgQLlHxFLsC8jJJFXb9baXzVotnNKfa',
  	access_token_key: '912111857481031680-r2o82iL1gLq3lL619BbhnWIhW8SnI4g',
  	access_token_secret: 'CB0DfVuIlvauU6fqX4sD9zl6Dkgs0xDhew6tdxWgz7jO8',
};


var spotifyKeys = {
  	id: "35e546db377b4e188f337cec84624f0e",
  	secret: "1f1d3ce4247343cbb4d4524e543f9b9a"
};


//exports!
module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys,
}