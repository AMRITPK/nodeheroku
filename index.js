var express = require('express');
var app = express();
var router = express.Router();


var path = require('path');  




var reservation ={
	first:function (req,res){
		console.log("asdfasdf");
		res.send('hello wechat')
	}
}





router.get('/', reservation.first);

app.use('/', router);
app.set('port', (process.env.PORT || 5000));
console.log("aaaa");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});