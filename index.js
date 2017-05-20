var express = require('express');
var app = express();
var router = express.Router();


var path = require('path');  

var request= require('request');
var servicefn=function(code,error,success){
		
		var request = require('request');
		var url="https://api.wechat.com/sns/oauth2/access_token?appid="+appId+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
		console.log(url);
		request(url, function (error1, response1, body1) {
			//console.log('error:', error1); // Print the error if one occurred
			console.log('statusCode:', response1 && response1.statusCode); // Print the response status code if a response was received
			console.log('body:', body1); // Print the HTML for the Google homepage.
			
			if(response1) {
				try {
					
					var respJson = JSON.parse(body1);
					if(respJson.errcode){
						error("Error:already authenticated");
					}else{
						var access_token=respJson.access_token;
						var openId=respJson.openid;
						var url1="https://api.wechat.com/sns/userinfo?access_token="+access_token+"&openid="+openId;						
						request(url1, function (error2, response2, body2) {
							console.log('error:', error2); // Print the error if one occurred
							console.log('statusCode:', response2 && response2.statusCode); // Print the response status code if a response was received
							console.log('body:', body2); // Print the HTML for the Google homepage.
							if(response2) {
								var resp2Json=JSON.parse(body2);
								if(resp2Json.errcode){
									error("Error:already authenticated");
								}
								console.log(resp2Json.openid);
								console.log(resp2Json.nickname);
								console.log(resp2Json.sex);
								console.log(resp2Json.province);
								console.log(resp2Json.city);
								console.log(resp2Json.country);
								console.log(resp2Json.headimgurl);
								var resp={};
								resp['openId']=resp2Json.openid;
								resp['name']=resp2Json.nickname;
								resp['sex']=resp2Json.sex;
								resp['province']=resp2Json.province;
								resp['city']=resp2Json.city;
								resp['country']=resp2Json.country;
								resp['image']=resp2Json.image;
								
								if(resp2Json.openid){
									success(resp);	
								}else{									
									error('code success');
								}
							}
						});			
						
							
					}
			
				} catch(e) {
					console.log("eroor in auth access_token") // error in the above string (in this case, yes)!
					error('error in auth json');
				}
			}
			
		});		
}
var appId='wxfaf116da42227208';
var secret='a6db367433edc83413205d5f464e0a7a';
var reservation ={
	root:function (req,res){
		console.log("asdfasdf");
		var link ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURI("https://wechat777.herokuapp.com/resp")+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		res.redirect(link);
		//res.send('hello wechat  <a href="'+link+'"> link </a>');
	},resp:function(req,res){
		servicefn(req.query.code, function error(errDetails){
			console.log(errDetails);
			res.send("error");
		},function success( userDetails ){
			if(userDetails){
				res.send("success"+userDetails.openId+"</br>"+userDetails.name+"</br>"+userDetails.country+"</br>"+userDetails.city+"</br>"+userDetails.sex+"</br>"+userDetails.image);				
			}else{
				res.send("Didnt find user details");
			}
		});
	
	}
}





router.get('/', reservation.root);
router.get('/resp', reservation.resp);



app.use('/', router);
app.set('port', (process.env.PORT || 5000));
console.log("aaaa");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});