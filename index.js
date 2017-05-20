var express = require('express');
var app = express();
var router = express.Router();


var path = require('path');  




var reservation ={
	root:function (req,res){
		console.log("asdfasdf");
		var link ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfaf116da42227208&redirect_uri="+encodeURI("https://wechat777.herokuapp.com/resp")+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		
		res.send('hello wechat  <a href="'+link+'"> link </a>');
	},first:function (req,res){
		console.log("first");
		
		res.send('first');
	},resp:function(req,resp){
		console.log(req.query);
		res.send("in auth resp</br>"+req.query.code);
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