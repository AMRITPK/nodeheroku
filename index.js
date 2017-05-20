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
	},test1:function(req,res){
		var str="051UPR3L1fSsN21chN0L1Rc34L1UPR3y"
		res.send("in auth resp</br>"+req.query.code);
	},resp:function(req,res){
		console.log(req.query);
		//res.send("in auth resp</br>"+req.query.code);
		//var code='051UPR3L1fSsN21chN0L1Rc34L1UPR3y';
		var code=req.query.code;
		var request = require('request');
		var url="https://api.wechat.com/sns/oauth2/access_token?appid="+appId+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
		console.log(url);
		request(url, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
			
			if(response) {
				try {
					
					var respJson = JSON.parse(body);
					if(respJson.errcode){
						res.send("Error:already authenticated");
					}else{
						var access_token=respJson.access_token;
						var openId=respJson.openid;
						var url1="https://api.wechat.com/sns/userinfo?access_token="+access_token+"&openid="+openId;						
						request(url1, function (error, response, body1) {
							console.log('error:', error); // Print the error if one occurred
							console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
							console.log('body:', body); // Print the HTML for the Google homepage.

							if(response) {
								var resp2Json=JSON.parse(body1);
								if(respJson.errcode){
									res.send("Error:already authenticated");
								}
								console.log(resp2Json.openid);
								console.log(resp2Json.nickname);
								console.log(resp2Json.sex);
								console.log(resp2Json.province);
								console.log(resp2Json.city);
								console.log(resp2Json.country);
								console.log(resp2Json.headimgurl);

								if(resp2Json.openid){
									res.send('auth'+access_token +"</br>"+resp2Json.openid+"</br>"+resp2Json.nickname+"</br>"+resp2Json.headimgurl);	
								}else{
									
									res.send('auth'+access_token);
								}
							}
						});			
						
							
					}
			
				} catch(e) {
					console.log("eroor in auth access_token") // error in the above string (in this case, yes)!
					res.send('error in auth');
				}
			}
			
		});		
	},test:function(req,res){
		var code='051UPR3L1fSsN21chN0L1Rc34L1UPR3y';
		var request = require('request');
		var url="https://api.wechat.com/sns/oauth2/access_token?appid="+appId+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
		console.log(url);
		request(url, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
			
			if(response) {
				try {
					
					var respJson = JSON.parse(body);
					if(respJson.errcode){
						res.send("Error:already authenticated");
					}else{
						var access_token=respJson.access_token;
						var openId=respJson.openid;
						var url1="https://api.wechat.com/sns/userinfo?access_token="+access_token+"&openid="+openId;						
						request(url1, function (error, response, body1) {
							console.log('error:', error); // Print the error if one occurred
							console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
							console.log('body:', body); // Print the HTML for the Google homepage.

							if(response) {
								var resp2Json=JSON.parse(body1);
								if(respJson.errcode){
									res.send("Error:already authenticated");
								}
								console.log(resp2Json.openid);
								console.log(resp2Json.nickname);
								console.log(resp2Json.sex);
								console.log(resp2Json.province);
								console.log(resp2Json.city);
								console.log(resp2Json.country);
								console.log(resp2Json.headimgurl);

								if(resp2Json.openid){
									res.send('auth'+access_token +"</br>"+respJson.openid+"</br>"+respJson.nickname+"</br>"+respJson.headimgurl);	
								}else{
									
									res.send('auth'+access_token);
								}
							}
						});			
						
							
					}
			
				} catch(e) {
					console.log("eroor in auth access_token") // error in the above string (in this case, yes)!
					res.send('error in auth');
				}
			}
			
		});
	}
}





router.get('/', reservation.root);
router.get('/first', reservation.first);
router.get('/resp', reservation.resp);
router.get('/test', reservation.test);
router.get('/test1', reservation.test1);

app.use('/', router);
app.set('port', (process.env.PORT || 5000));
console.log("aaaa");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});