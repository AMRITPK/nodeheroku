var express = require('express');
var app = express();
var router = express.Router();


var path = require('path');  




var reservation ={
	root:function (req,res){
		console.log("asdfasdf");
		var link ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx03d30e4803f09276&redirect_uri="+encodeURI("https://wechat777.herokuapp.com/")+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		
		res.send('hello wechat  <a href="'+link+'"> ');
	},first:function (req,res){
		console.log("first");
		
		res.send('first');
	}
}





router.get('/', reservation.root);
router.get('/first', reservation.first);

app.use('/', router);
app.set('port', (process.env.PORT || 5000));
console.log("aaaa");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});