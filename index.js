var express = require('express');
var app = express();
var router = express.Router();


var path = require('path');  

var request= require('request');

var appId='wxfaf116da42227208';
var secret='a6db367433edc83413205d5f464e0a7a';
var reservation ={
	root:function (req,res){
		console.log("asdfasdf");
		var link ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURI("https://wechat777.herokuapp.com/resp")+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		
		res.send('hello wechat  <a href="'+link+'"> link </a>');
	},first:function (req,res){
		console.log("first");
		
		res.send('first');
	},resp:function(req,res){
		console.log(req.query);
		res.send("in auth resp</br>"+req.query.code);
	},test:function(req,res){
		var code='011z0ClG0JI0ah2cDelG0QgDlG0z0ClY';
		var request = require('request');
		var url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appId+"&secret="+secret+"&code=CODE&grant_type="+code
		request(url, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
			res.send(body);
		});
	}
}





router.get('/', reservation.root);
router.get('/first', reservation.first);
router.get('/resp', reservation.resp);

app.use('/', router);
app.set('port', (process.env.PORT || 5000));
console.log("aaaa");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});